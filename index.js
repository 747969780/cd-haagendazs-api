'use strict';
import api from "./http/index.js";
import { version } from './package.json';

const candao = api;

// 版本号
candao.__version__ = version;

export default candao;