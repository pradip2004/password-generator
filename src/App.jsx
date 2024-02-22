
import React, { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [isnum, setIsnum] = useState(false);
  const [ischar, setIschar] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (isnum) str += '1234567890';
    if (ischar) str += '!@#$%^&*()_+-=';
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isnum, ischar, setPassword]);

  useEffect(() => passwordGenerator(), [length, isnum, ischar, setPassword])
  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])


  return (
    <div className='bg-zinc-900 w-full h-screen flex items-center justify-center'>
      <div className='w-full max-w-md shadow-md rounded-lg px-4 py-4 text-orange-500 bg-zinc-700'>
        <h1 className='text-white font-semibold text-2xl'>Password Generator</h1>
        <div className='flex rounded-lg overflow-hidden mb-4 py-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 rounded-ss-lg rounded-es-lg'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='bg-green-600 py-1 px-4 outline-none shrink-0 text-white text-md rounded-se-lg rounded-ee-lg hover:bg-green-800'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label> Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={isnum}
              id='numberInput'
              onChange={() => setIsnum((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={ischar}
              id='charInput'
              onChange={() => setIschar((prev) => !prev)}
            />
            <label>Characters</label>
          </div>
        </div>

      </div>
    </div>

  );
}

export default App;

