import './App.css';
// Input setup with given function
export default function FeedLinkInput({SetLink}) {
  return (
    <div className="FeedLinkInputContainer text-center m-5">
        <input className='text-center FeedLinkInput' onChange={e => (SetLink(e.target.value))} placeholder='Enter RSS Link ...'></input>
        
    </div>    
  );
}
