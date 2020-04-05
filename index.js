const request = require('request-promise')
const _ = require('lodash')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Discord = require('discord.js')
const fs = require('fs')

const client = new Discord.Client()
client.commands = new Discord.Collection()
