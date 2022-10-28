import React, {useState, useEffect} from 'react'
import Loader from './Loader';
import getUsers from './service/Api'

export default function Content() {
    
    const [details, setDetails] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const getDetails = async () =>{
        try{
            setIsLoading(true)
            const res = await getUsers()
            //console.log(res.results)
            setDetails(res.results)
            setIsLoading(false)
            localStorage.setItem('user_title', JSON.stringify(res.results[0].name.title))
            localStorage.setItem('user_first_name', JSON.stringify(res.results[0].name.first))
            localStorage.setItem('user_last_name', JSON.stringify(res.results[0].name.last))
            localStorage.setItem('user_email', JSON.stringify(res.results[0].email))

        }catch(error){
            console.log(error)
            setIsLoading(false)
          }
      }

    useEffect(() => {
       getDetails()
    }, [])


    //for refresh button
     const submit = (e)=>{
          e.preventDefault()
          getDetails()
        }


  return (
    <>
      <div className=' container pt-5'> 
        <div className='flex-center  '>
        {isLoading ? <Loader/> :
          <>
            {
              details.map((detail, ind)=>{
              return(
                  <div key={ind}>
                    <div className='card radius'>
                      <h4 className="card-header bg-transparent text-secondary text-center  font-weight-bold ">{detail.name.title} {""} {detail.name.first} {""} {detail.name.last}</h4>
                    <div className='card-body'>
                      <img alt = {detail.name.first} className = "img-fluid" width="100%" height="100%" src= {detail.picture.large} />
                      <hr className='color-black'/>
                      <h6 className='font-weight-bold text-default'><span className='font-weight-bold text-dark'>Email: </span> {detail.email}</h6>
                    </div>
                   </div>
                </div>
                ) 
              })
            }
          </>
        }
        </div> 
        <div className='text-center pt-3 '>
          <button className='btn btn-primary btn-lg font-weight-bold ' onClick={submit}>Refresh <i className="fas fa-sync-alt pl-2"></i></button>
        </div> 
      </div>
    </> 
    
  );
}

