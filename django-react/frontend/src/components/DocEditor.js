import React, {useState, useMemo, useCallback} from 'react'
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import {AiOutlineBold, AiOutlineItalic, AiOutlineUnderline} from 'react-icons/ai'
import {FaBold, FaItalic, FaUnderline, FaFont} from 'react-icons/fa'
import {BiChevronDownSquare} from 'react-icons/bi'
import {BiFont} from 'react-icons/bi'
import { HexColorPicker } from "react-colorful";

import Navbar from './Navbar'
import useAutosave from '../utils/useAutosave';
import SentimentView from '../components/SentimentView';

const DocEditorHeader = ({saving, msg})=>{

  const [bold, setBold] = useState(false)
  const [italics, setItalics] = useState(false)
  const [underline, setUnderline] = useState(false)
  const [color, setColor] = useState("#aabbcc");
  const [displayColor, setDisplayColor] = useState(false)


  return(
    <div>
      <div className='pt-10 pb-2'>
        <p className='text-sm text-gray-500 tracking-wide'>{saving ? 'Saving ...' : msg}</p>
      </div>
      <div className='flex'>
        {/* Type of text */}
        <select name="type" id="type" className="px-6 py-1 border border-lifepad_black focus:outline-none">
          <option value="paragraph">Paragraph</option>
          <option value="title">Title</option>
        </select>
        {/* Type of font */}
        <select name="type" id="type" className="px-6 py-1 border border-lifepad_black focus:outline-none">
          <option value="Arial">Arial</option>
          <option value="Comic Sans">Comic Sans</option>
        </select>
        {/* Font size */}
        <select name="type" id="type" className="px-6 py-1 border border-lifepad_black focus:outline-none">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 56, 58, 60, 62, 64, 66, 68, 70, 72].map((num) =>(
            <option value={num}>{num}px</option>
          ))}
        </select>
        <div className="px-6 py-1 border border-lifepad_black focus:outline-none flex w-fit">
            <div className="flex pt-1 space-x-2">
              <div  className='cursor-pointer' onClick={()=> setBold(!bold)}>{!bold ? <AiOutlineBold/> : <FaBold/>}</div>
              <div  className='cursor-pointer' onClick={() => setItalics(!italics)}>{!italics ? <AiOutlineItalic/> : <FaItalic/>} </div>
              <div  className='cursor-pointer' onClick={() => setUnderline(!underline)}>{!underline ? <AiOutlineUnderline/> : <FaUnderline/>} </div>
            </div>
        </div>
        <div className="px-6 py-1 border border-lifepad_black focus:outline-none flex w-fit">
          {/*Color Picker */}
          <div className='grid place-items-center relative' onClick={() => setDisplayColor(!displayColor)}>
            {!displayColor ? <BiFont/> : <FaFont/>}
            <div className='w-6 h-1' style={{backgroundColor: color}}></div>
            {displayColor &&
            <div className='absolute -bottom-52 left-0'>
                <HexColorPicker color={color} onChange={setColor} />
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}
  



const DocEditor = () => {
    const [fullText, setFullText]=useState("");
    const [selectedText,setSelectedText] = useState("")
    const [saving, setSaving] = useState(true)
    const [msg, setMsg] = useState("")

    const renderElement = useCallback(props => {
        switch (props.element.type) {
          case 'code':
            return <CodeElement {...props} />
          default:
            return <DefaultElement {...props} />
        }
      }, [])

    const editor = useMemo(() => withReact(createEditor()), []);

    //Initial editor contents
    const loadedData = useMemo(() => 
      JSON.parse(window.localStorage.getItem("doc")) || [
        {
          type: 'paragraph',
          children: [{ text: 'Welcome to Life Pad!' }],
        },
      ],
      []
    );

    const [value, setValue] = useAutosave(loadedData, (res)=>{
      const mssg = res?.data?.message
      setMsg(mssg)
      setSaving(!saving)
    });
    const onChangeContent = useCallback((newValue) => {
      // only save if text changed, not selection
      const isAstChange = editor.operations.some(
        op => 'set_selection' !== op.type
      );
      if (isAstChange) {
        // Save the value to Local Storage.
        setValue(newValue);
        setSaving(true);
      }
      if(editor.selection){
        setSelectedText(Editor.string(editor, editor.selection));
      }
      else{
        setSelectedText("");
      }
      
      //Get all text from the current document and set fullText
      let alltext="";
      //Iterate through the paragraphs
      for (const text of (editor.children)) {
        alltext+=text.children[0].text;
      }
      if(alltext.trim()){
        setFullText(alltext);
      }
      else{
        setFullText("");
      }
    });

  return (
    <div style={{width: "500px", margin: "5px auto"}}>
    <DocEditorHeader saving={saving} msg={msg}/>
    <SentimentView className="z-100 left-[70px] top-[40px]" sentimentSentence={fullText} sentimentType="All"/>
    {selectedText && <SentimentView className="z-100 left-[70px] top-[40px]" sentimentSentence={selectedText} sentimentType="Selected"/>}
    

    <Slate
      editor={editor}
      value={value}
      onChange={ onChangeContent}
    >
        <Editable 
          renderElement={renderElement}
          spellCheck={true}
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