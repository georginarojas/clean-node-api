import { json } from 'express'

// This was made because for default the express routes' don't know to do
// parser of json in post and put
export const bodyParser = json()
