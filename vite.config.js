import React from 'react';
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
        proxy:{
            '/api':{
                target:'http://localhost:8080',
            
            },
        },
    },
    pluging:[react()],
})