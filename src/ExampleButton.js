import './App.css';

export default function ExampleButton({SetLink, myButtons}) {
  // Buttons generatet from the dictionaries in App.js
  return (
    <div className="text-center m-5">
      {myButtons.map((currentButton) => {
        return(
          <a className='btn m-3 rounded-0 w-50' onClick={e => (SetLink(currentButton.link))}>{currentButton.name}</a> 
        )       
        
      })}
            
    </div>    
  );
}
