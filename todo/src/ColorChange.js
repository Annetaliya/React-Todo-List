import React, {useState} from 'react';

const ColorChange = () => {

    const [color, setColor] = useState('');
  return (
    <div>
        
        <input
            type='text'
            placeholder='Add color name'
            value={color}
            onChange={(e) => setColor(e.target.value)}
        />
        
            <div style={{background: color}} className='colorDiv'>
                <p>{color ? color : 'Empty Value'}</p>

            </div>

        

    </div>
  )
}

export default ColorChange