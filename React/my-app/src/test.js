import React, { useEffect, useState } from "react";

function Test(){

    let [count, setCount] = useState(0);
    let [age, setAge] = useState(20);
    
    useEffect(() => {
        
        if(count != 0 && count < 3){
            setAge(age + 1)
        }else{
            setAge(age)
        }        
        console.log(count);
    }, [count])

    return(
        <div>
            <div>안녕하십니까 전 {age}</div>
            <button onClick={() => {
                setCount(count + 1)
                // { count < 3
                //     ? setAge(age + 1)
                //     : setAge(age);
                // }                
            }}>누르면 한살먹기</button>
        </div>
    );
}

export default Test;