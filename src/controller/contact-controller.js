import contactService from "../service/contact-service.js";


const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await contactService.createContact(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try{
        const user = req.user;
        const contactId = req.params.contactId;
        const result = await contactService.getContact(user, contactId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const update = async(req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId
        const request = req.body;
        request.id = contactId


        const result = await contactService.updateContact(user, request)
        res.status(200).json({
            data: result
        })
    }catch (e){
        next(e);
    }
}


const remove = async(req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;

        await contactService.removeContact(user, contactId);
        res.status(200).json({
            data: "OK"
        })
    }catch (e) {
        next(e);
    }
}

const search = async (req, res, next) => {
    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        };

        const result = await contactService.searchContact(user, request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}