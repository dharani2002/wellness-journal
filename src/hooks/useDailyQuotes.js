import { useEffect, useState } from "react";

function useDailyQuotes(){
    const [data, setData]= useState({quote:'',author:''})
    useEffect(()=>{
        let url=`https://api.realinspire.tech/v1/quotes/random`
        fetch(url)
        .then((res)=>res.json())
        .then((res) => {
            if (res && res[0]) {
              console.log('API Response:', res[0]); // Log the first item in the response array
              setData({ quote: res[0].content, author: res[0].author }); // Set quote and author from the first item in the array
            }
        })
        .catch((error) => {
            console.error('Error fetching quote:', error);
            setData({ quote: 'Failed to fetch quote', author: '' }); // Optional: handle errors
          })
    },[])
    return data
}

export default useDailyQuotes