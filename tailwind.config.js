/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html", "./src/components/Medinitech/**/*.{js,jsx,ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
	theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			customBlue: 'rgb(35,65,75)',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			lightgray: '#FAF3E0',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			black: {
    				'50': '#f7f7f7',
    				'100': '#e3e3e3',
    				'200': '#c8c8c8',
    				'300': '#a4a4a4',
    				'400': '#818181',
    				'500': '#666666',
    				'600': '#515151',
    				'700': '#434343',
    				'800': '#383838',
    				'900': '#121212',
    				'950': '#000000',
    				DEFAULT: '#000000'
    			}
    		},
			fontFamily: {
				inter: ["Inter","sans-serif"],
				roboto: ["Roboto","sans-serif"],
				playfair: ["Playfair Display", "serif"],
				firacode: ["Fira Code", "monospace"],
				cursive: ["Dancing Script", "cursive"],
				'open-sans': ['"Open Sans"', 'sans-serif']
			},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: 0
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: 0
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
				'blink': 'blink 0.7s infinite',
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
  }
  
  