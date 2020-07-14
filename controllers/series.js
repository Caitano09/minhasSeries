const labels = [// para usar na tag select
    { id: 'to-watch', name: 'Para Assistir' },
    { id: 'watching', name: 'assistindo' },
    { id: 'watched', name: 'assistido' }
]

const index = async ({ Serie }, req, res) => {
    docs = await Serie.find({})
    res.render('series/index', { series: docs, labels })
}

const novaProcess = async ({ Serie }, req, res) => {
    const serie = new Serie(req.body)
    try {
        await serie.save()
        res.redirect('/series')
    } catch (err) {
        res.render('series/nova', {
            errors: Object.keys(err.errors)
        })
    }

}

const novaForm = (req, res) => {
    res.render('series/nova', { errors: [] })
}

const excluir = async ({ Serie }, req, res) => {
    await Serie.remove({ _id: req.params.id })
    res.redirect('/series')
}

const editarProcess = async ({ Serie }, req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id })
    serie.name = req.body.name,
    serie.status = req.body.status
    try {
        await serie.save()
        res.redirect('/series')
    } catch (err) {
        res.render('series/editar', {
            serie,
            labels,
            errors: Object.keys(err.errors)
        })
    }
}

const editarForm = async ({ Serie }, req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id })
    res.render('series/editar', { serie, labels, errors: [] })

}

const info = async({Serie}, req, res) =>{
    const serie = await Serie.findOne({_id: req.params.id})
    res.render('series/info', {serie})
}

const addComentario = async({Serie}, req, res) =>{
    await Serie.updateOne({_id: req.params.id}, {$push: {comments: req.body.comentario}})
    res.redirect('/series/info/'+req.params.id)
}


module.exports = {
    index,
    novaProcess,
    novaForm,
    excluir,
    editarForm,
    editarProcess,
    info,
    addComentario
}