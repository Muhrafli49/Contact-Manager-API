import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js"
import { getContactValidation } from "../validation/contact-validation.js"
import { ResponseError } from "../error/response-error.js";
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js"
import { request } from "express";

const checkContactMustExists = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    });

    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, "contact is not found");
    }

    return contactId;
}

const createAddress = async (user, contactId, request) => {
    contactId = await checkContactMustExists(user, contactId);

    const address = validate(createAddressValidation, request);
    address.contact_id = contactId

    return prismaClient.address.create({
        data: address, 
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true, 
            postalCode: true
        }
    })
}


const getAddress = async (user, contactId, addressId) => {
    contactId = await checkContactMustExists(user, contactId);
    addressId = validate(getAddressValidation, addressId);

    const address = await prismaClient.address.findFirst({
        where: {
            contact_id: contactId,
            id: addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true, 
            postalCode: true
        }
    });

    if (!address) {
        throw new ResponseError(404, "Address is not found");
    }

    return address;
}


const updateAddress = async (user, contactId, request) => {
    contactId = await checkContactMustExists(user, contactId);
    const address = validate(updateAddressValidation, request);

    const totalAddressInDatabase = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: address.id
        }
    });

    if(totalAddressInDatabase !== 1) {
        throw new ResponseError(404, "Address is not found");
    }

    return prismaClient.address.update({
        where: {
            id: address.id
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postalCode: address.postalCode
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true, 
            country: true,
            postalCode: true
        }
    });
}

export default {
    createAddress,
    getAddress,
    updateAddress
}