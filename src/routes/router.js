const routes = require('express').Router()

const { randomUUID } = require('crypto')
const fs = require('fs')

let books = []