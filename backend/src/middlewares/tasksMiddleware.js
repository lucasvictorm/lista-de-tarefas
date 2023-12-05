const validateFieldTitle = (req, res, next) => {
    const {body} = req;
    if(body.title == undefined){
        return res.status(400).json({message: 'O campo "Título" é requerido.'})
    }

    if(body.title == ''){
        return res.status(400).json({message: 'O campo "Título" não pode estar vazio.'})
    }

    next()
}

const validateFieldStatus = (req, res, next) => {
    const {body} = req;
    if(body.status == undefined){
        return res.status(400).json({message: 'O campo "Status" é requerido.'})
    }

    if(body.status == ''){
        return res.status(400).json({message: 'O campo "Status" não pode estar vazio.'})
    }

    next()
}

module.exports = {
    validateFieldTitle,
    validateFieldStatus
}