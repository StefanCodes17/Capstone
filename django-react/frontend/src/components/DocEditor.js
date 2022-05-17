import React, {useState, useMemo, useCallback} from 'react'
import { createEditor, Editor, Transforms,Text } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import {AiOutlineBold, AiOutlineItalic, AiOutlineUnderline, AiOutlineStrikethrough} from 'react-icons/ai'
import {FaBold, FaItalic, FaUnderline, FaFont, FaStrikethrough} from 'react-icons/fa'
import {BiFont} from 'react-icons/bi'
import { HexColorPicker } from "react-colorful";
import isHotkey from 'is-hotkey';

import useAutosave from '../utils/useAutosave';
import SentimentView from '../components/SentimentView';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
  'mod+d': 'strikethrough'
};

const DocEditor = () => {
    const [fullText, setFullText]=useState("");
    const [selectedText,setSelectedText] = useState("")
    const [saving, setSaving] = useState(true)
    const [msg, setMsg] = useState("")
    const [color, setColor] = useState("#aabbcc");
    const [displayColor, setDisplayColor] = useState(false)
    
    //Override deselect to avoid losing focus
    Transforms.deselect = () => {};

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
  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <div style={{width: "600px", margin: "5px auto"}}>
    {/* <DocEditorHeader saving={saving} msg={msg}/> */}
    
    

    <Slate
      editor={editor}
      value={value}
      onChange={ onChangeContent}
    > 
        {/* Toolbar */}
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
                  <div  className='cursor-pointer' onMouseDown={(event) => {
                      event.preventDefault();
                      toggleMark(editor,'bold');
                    }
                  }>
                    {!isMarkActive(editor,'bold') ? <AiOutlineBold/> : <FaBold/>}
                  </div>
                  <div  className='cursor-pointer' onMouseDown={(event) => {
                      event.preventDefault();
                      toggleMark(editor,'italic')
                    }
                  }>
                    {!isMarkActive(editor,'italic') ? <AiOutlineItalic/> : <FaItalic/>} 
                  </div>
                  <div  className='cursor-pointer' onMouseDown={(event) => {
                      event.preventDefault();
                      toggleMark(editor,'underline')
                    }
                  }>
                    {!isMarkActive(editor,'underline')? <AiOutlineUnderline/> : <FaUnderline/>} 
                  </div>
                  <div  className='cursor-pointer' onMouseDown={(event) => {
                      event.preventDefault();
                      toggleMark(editor,'strikethrough')
                    }
                  }>
                    {!isMarkActive(editor,'strikethrough')? <AiOutlineStrikethrough/> : <FaStrikethrough/>} 
                  </div>
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
        {/* Sentiment Analysis */}
        <SentimentView className="z-100 left-[70px] top-[40px]" sentimentSentence={fullText} sentimentType="All"/>
        {selectedText && <SentimentView className="z-100 left-[70px] top-[40px]" sentimentSentence={selectedText} sentimentType="Selected"/>}

        <Editable 
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck={true}
          autoFocus
          onKeyDown={event => {
            //Hotkey to select all text
            if (event.key === 'a' && event.ctrlKey) {
              Transforms.select(editor, {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, []),
              })
            }
            for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                    event.preventDefault()
                    const mark = HOTKEYS[hotkey]
                    toggleMark(editor, mark)
                }
            }
        }}
        />
      </Slate>
    </div>
  )
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
      Editor.removeMark(editor, format)
  } else {
      Editor.addMark(editor, format, true)
  }
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

// Define a React component to render leaves
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
      children = <strong>{children}</strong>
  }

  if (leaf.code) {
      children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>
  }
  
  return <span {...attributes}>{children}</span>
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