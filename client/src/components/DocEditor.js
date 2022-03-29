import React, {useState, useMemo, useCallback} from 'react'
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import {AiOutlineBold, AiOutlineItalic, AiOutlineUnderline} from 'react-icons/ai'
import {FaBold, FaItalic, FaUnderline, FaFont} from 'react-icons/fa'
import {BiFont} from 'react-icons/bi'
import { HexColorPicker } from "react-colorful";

import Navbar from './Navbar'

const DocEditorHeader = ()=>{

  const [bold, setBold] = useState(false)
  const [italics, setItalics] = useState(false)
  const [underline, setUnderline] = useState(false)
  const [color, setColor] = useState("#aabbcc");
  const [displayColor, setDisplayColor] = useState(false)


  return(
    <div className='px-5 pt-10 flex'>
      {/* Type of text */}
      <select name="type" id="type" className="px-6 py-1 border border-gray-200 focus:outline-none">
        <option value="paragraph">Paragraph</option>
        <option value="title">Title</option>
      </select>
      {/* Type of font */}
      <select name="type" id="type" className="px-6 py-1 border border-gray-200 focus:outline-none">
        <option value="Arial">Arial</option>
        <option value="Comic Sans">Comic Sans</option>
      </select>
      {/* Font size */}
      <select name="type" id="type" className="px-6 py-1 border border-gray-200 focus:outline-none">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 56, 58, 60, 62, 64, 66, 68, 70, 72].map((num) =>(
          <option value={num}>{num}px</option>
        ))}
      </select>
      <div className="px-6 py-1 border border-gray-200 focus:outline-none flex w-fit">
          <div className="flex pt-1 space-x-2">
            <div  className='cursor-pointer' onClick={()=> setBold(!bold)}>{!bold ? <AiOutlineBold/> : <FaBold/>}</div>
            <div  className='cursor-pointer' onClick={() => setItalics(!italics)}>{!italics ? <AiOutlineItalic/> : <FaItalic/>} </div>
            <div  className='cursor-pointer' onClick={() => setUnderline(!underline)}>{!underline ? <AiOutlineUnderline/> : <FaUnderline/>} </div>
          </div>
      </div>
      <div className="px-6 py-1 border border-gray-200 focus:outline-none flex w-fit">
         {/*Color Picker */}
         <div className='grid place-items-center relative' onClick={() => setDisplayColor(!displayColor)}>
           {!displayColor ? <BiFont/> : <FaFont/>}
           <div className='w-6 h-1' style={{"background-color": color}}></div>
           {displayColor &&
          <div className='absolute -bottom-52 left-0'>
              <HexColorPicker color={color} onChange={setColor} />
          </div>}
         </div>
      </div>
    </div>
  )
}
  
const DocEditor = () => {

    const renderElement = useCallback(props => {
        switch (props.element.type) {
          case 'code':
            return <CodeElement {...props} />
          default:
            return <DefaultElement {...props} />
        }
      }, [])

    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  return (
    <>
    <Navbar/>
    <DocEditorHeader/>
    <div className='px-5 py-2'>
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue)}
        >
          <Editable 
          renderElement={renderElement}
          onKeyDown={event => {
              if (event.key === '`' && event.ctrlKey) {
                  event.preventDefault()
                  // Determine whether any of the currently selected blocks are code blocks.
                  const [match] = Editor.nodes(editor, {
                    match: n => n.type === 'code',
                  })
                  // Toggle the block type depending on whether there's already a match.
                  Transforms.setNodes(
                    editor,
                    { type: match ? 'paragraph' : 'code' },
                    { match: n => Editor.isBlock(editor, n) }
                  )
                }
              }}
          />
        </Slate>
    </div>
    </>
  )
}

const CodeElement = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  }

  const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
  }

export default DocEditor;