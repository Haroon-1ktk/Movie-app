/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      padding:{
        DEFAULT:'15px'
      }
    },
    screens:{
    sm:'640px',
    md:'768px',
    lg:'960px',
    xl:'1200px',
    xsm:'550px'
    },
   
    extend: {
      colors:{
        primary:{
          default:'#292f36',
          hover:'#343e4d'
        },
        secondary:'#4d5053',
        accent:{
         default:'#cda274',
         secondary:'#f4f0ec',
         hover:'#b88c5d'
        }
      }
    },
  },
  plugins: [],
}