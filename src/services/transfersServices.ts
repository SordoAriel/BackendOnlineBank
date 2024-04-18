import { get, create } from '../controllers/transfersController'

export const getAll = async (req, res) => {
    const searchingFilters = {...req.body}
    try {
        const results = await get(searchingFilters)
    if(results === -1) {
        res.status(400).json({message: 'Invalid search'})
    } else if(!results.length ) {
        res.status(400).json({message: 'No registers found'})
    } else {
        res.status(200).json({message: 'Transferences', payload: results})    }
    } catch (error) {
        res.status(500).json(error)
    }
    


}

export const newTransfer = async (req, res) => {
    const dataTransfer = {...req.body}
    try {
        const transfer = await create(dataTransfer)
        if(!transfer){
            res.status(400).json({message: 'Couldn´t finish transfer'})
        } else {
            res.status(200).json({message: 'Transfer done', transferData: transfer})
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
}