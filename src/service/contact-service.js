import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from "../validation/contact-validation.js";
import { ResponseError } from "../error/response-error.js";

const createContact = async (user, request) => {
    const contact = validate(createContactValidation, request);
    contact.username = user.username;

    return prismaClient.contact.create({
        data: contact,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
        }
    });
};

const getContact = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const contact = await prismaClient.contact.findFirst({
        where: {
            username: user.username,
            id: contactId
        },
        select : {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
        }
    });

    if(!contact) {
        throw new ResponseError(404, "Contact is not found");
    }

    return contact;
}


const updateContact = async (user, request) => {
    const contact = validate(updateContactValidation, request);

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contact.id
        }
    });

    if(totalContactInDatabase !== 1){
        throw new ResponseError(404, "contact is not found");
    }

    return prismaClient.contact.update({
        where: {
            id: contact.id
        },
        data: {
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phone: contact.phone
        }, 
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
        }
    })
}


const removeContact = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const totalInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    });

    if(totalInDatabase !== 1) {
        throw new ResponseError(404, "contact is not found");
    }

    return prismaClient.contact.delete({
        where: {
            id: contactId
        }
    });
}


const searchContact = async (user, request) => {
    request = validate(searchContactValidation, request);

    const skip = (request.page - 1) * request.size;

    const filters = [];

    filters.push({
        username: user.username
    })

    if (request.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.name
                    }
                },
                {
                    last_name: {
                        contains: request.name
                    }
                }
            ]
        });
    }
    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        });
    }
    if (request.phone) {
        filters.push({
            phone: {
                contains: request.phone
            }
        });
    }

    const contacts = await prismaClient.contact.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.contact.count({
        where: {
            AND: filters
        }
    });

    return {
        data: contacts,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

export default {
    createContact,
    getContact,
    updateContact,
    removeContact,
    searchContact
}