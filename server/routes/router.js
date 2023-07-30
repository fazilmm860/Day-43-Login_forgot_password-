const express = require('express');
const router = express.Router();
const userdb = require('../models/userSchema')
const bcrypt = require("bcryptjs");
