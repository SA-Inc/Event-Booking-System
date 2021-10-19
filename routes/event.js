const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { json } = require('express');
const nodemailer = require("nodemailer");
require('dotenv').config();

const prisma = new PrismaClient();



router.get('/event', async (req, res, next) => {
    try {
        const events = await prisma.event.findMany({
            orderBy: [
                {
                  id: 'desc',
                }
            ],
        });
        res.json(events);
    } catch (error) {
        next(error);
    }
});



router.get('/event/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const event = await prisma.event.findUnique({
            where: {
                id: Number(id)
            }
        });

        res.json(event);
    } catch (error) {
        next(error);
    }
});



router.post('/event', async (req, res, next) => {
    try {
        const event = await prisma.event.create({
            data: req.body,
        });

        res.json(event);
    } catch (error) {
        console.log(error)
        next(error);
    }
});

router.put('/event/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const event = await prisma.event.update({
            where: {
                id: Number(id)
            },
            data: req.body
        });

        res.json(event);
    } catch (error) {
        next(error);
    }
});

router.delete('/event/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const order = await prisma.event.delete({
            where: {
                id: Number(id)
            }
        });

        res.json(order);
    } catch (error) {
        console.log(error)
        next(error);
    }
});



module.exports = router;