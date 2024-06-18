import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [range, setRange] = useState(8)
  const [Numbers, setNumbers] = useState(false)
  const [Special, setSpecial] = useState(false)
  const [Copied, setCopied] = useState(false)
  const [Password, setPassword] = useState()
  const passwordSaver = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (Numbers) str += '1234567890'
    if (Special) str += '!@#$%&*()-_=+|[]{};:/?.'

    for (let i = 0; i < range; i++) {
      let passstr = Math.floor(Math.random() * str.length + 1)
       pass += str.charAt(passstr)
    }
    setPassword(pass)
    setCopied(false)
  }, [range, Numbers, Special, setPassword , Copied])

  const passwordsave = useCallback(()=>{
    window.navigator.clipboard.writeText(Password);
    setCopied(true)
  } , [Password])
  useEffect(()=>{passwordGenerator()} , [range, Numbers, Special, setPassword ] )

  return (
    <>
      <div className=' items-center flex flex-col pt-10 bg-zinc-100 h-screen'>
        <div className="w-full  text-center">
          <h1 className='text-3xl font-bold font-["Monotype_Corsiva"]'>Password Generator</h1>
          <div className=" relative w-full">
            <input id="passwordinst" disabled type="text" ref={passwordSaver} className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-3xl focus:ring-blue-500 text-center focus:border-blue-500 w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Password Generator' value={Password} />
            <button className="absolute top-1/2 -translate-y-1/2 text-gray-500 bg-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-3xl p-2 inline-flex" onClick={passwordsave}>
              {!Copied? (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z"/></svg>): (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>)}
            </button>
          </div>
        </div>
        <div className='gap-y-5 flex flex-col items-center w-full justify-center'>

          <div className=" flex mb-5  w-full items-center justify-center">
            <div className="relative w-1/3 ms-20 me-2">
              <label htmlFor="words" className="sr-only">Default range</label>
              <input id="words" type="range" defaultValue={range} min={8} max={20} onChange={(e)=>{setRange(e.target.value)}} className="w-full h-2 bg-gray-200 appearance-none cursor-pointer dark:bg-gray-700" />
              <span className="text-sm absolute start-0 -bottom-6">Min (8)</span>
              <span className="text-sm absolute end-0 -bottom-6">Max (20)</span>
            </div>
            <div className=' w-1/8 text-end'>
              <p className='ms-2 text-lg font-medium text-gray-900 font-["SF_Pro_Display"] '>Range {range}</p>
            </div>
          </div>

          <div className="flex mb-4 items-center">
            <input id="Numbers" type="checkbox" defaultChecked={Numbers} onChange={()=>{setNumbers((prev)=>!prev)}} className="w-4 h-4 text-blue-600 outline-none border-none bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
            <label htmlFor="Numbers" className="ms-2 text-lg font-medium text-gray-900 font-['SF_Pro_Display'] ">Numbers</label>
          </div>
          <div className="flex  mb-4 items-center">
            <input id="Special" type="checkbox" defaultChecked={Special} onChange={()=>{setSpecial((prev)=>!prev)}}  className="w-4 h-4 text-blue-600 outline-none border-none bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
            <label htmlFor="Special" className="ms-2 text-lg font-medium text-gray-900 font-['SF_Pro_Display'] ">Special characters</label>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default App
