const videoGames = require('../models/Games.js')
const express = require('express')
const router = express.Router()

module.exports = router

router.get('/getAllGames', (req, res) => {
    if (videoGames.length === 0){
        return res.status(404).json({
            confirmation: 'failed',
            message: 'no games found'
        })
    }
    return res.status(200).json({confirmation: 'success', videoGames})
})
router.get('/getSingleGame/:id', (req, res) => {
    const game = videoGames.filter(game => game.id === req.params.id)

    if (game.length === 0){
        return res.status(404).json({
            confirmation: 'failed',
            message: 'game not found'
        })
    }

    return res.status(200).json({confirmation: 'success', game})
})
router.post('/createGame', (req, res) => {
    const newGame = {}
    newGame.id = Date.now()
    newGame.name = req.body.name
    newGame.description = req.body.description
    newGame.yearReleased = req.body.yearReleased
    newGame.playtime = req.body.playtime

    if (!newGame.name || !newGame.description){
        return res.status(400).json({
            confirmation: 'failed',
            message: 'Name and description are required fields'
        })
    }
    for (const game of videoGames){
        if (game.name === newGame.name){
            return res.status(400).json({
                confirmation: 'failed',
                message: 'This game already exists'
            })
        }
    }

    videoGames.push(newGame)
    return res.status(201).json({confirmation: 'success', newGame})
})
router.put('/updateGame/:id', (req, res) => {
    const game = videoGames.filter(game => game.id === req.params.id)

    if (game.length === 0){
        return res.status(400).json({
            confirmation: 'failed',
            message: 'game not found'
        })
    }

    let updatedGame = req.body

    game[0].name = updatedGame.name ? updatedGame.name : game[0].name
    game[0].description = updatedGame.description ? updatedGame.description : game[0].description
    game[0].yearReleased = updatedGame.yearReleased ? updatedGame.yearReleased : game[0].yearReleased
    game[0].playtime = updatedGame.playtime ? updatedGame.playtime : game[0].playtime

    return res.status(200).json({confirmation: 'success', game})
})
router.delete('/deleteGame/:id', (req, res) => {
    const games = videoGames.filter(game => game.id !== req.params.id)

    if (games.length === videoGames.length){
        return res.status(400).json({
            confirmation: 'failed',
            message: 'game not found'
        })
    }
    return res.status(200).json({
        confirmation: 'success',
        message: 'game deleted',
        newGames: games
    })
})
