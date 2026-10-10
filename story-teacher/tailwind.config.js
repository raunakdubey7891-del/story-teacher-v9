// Streaming-app theme. "paper" is the near-black stage, "surface"/"soft" are raised panels, "ink" is the light text colour,
// "brand" is the single bold accent (buttons, progress), "sun" is a warm gold used for small highlights.
export default { content:['./index.html','./src/**/*.{ts,tsx}'],
 theme:{extend:{colors:{ink:'#F2F2F5',deep:'#000000',brand:{DEFAULT:'#E50914',hover:'#F6121D'},sun:'#F5B942',amber:'#FFD27A',mint:'#46D39A',coral:'#FF6B6B',paper:'#0B0B0F',surface:'#16161C',soft:'#22222B',line:'#2C2C36'},
 fontFamily:{display:['Nunito','system-ui','sans-serif'],sans:['"Nunito Sans"','system-ui','sans-serif']}}}}
