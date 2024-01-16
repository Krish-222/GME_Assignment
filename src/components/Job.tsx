import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';


//basically it is a component of a parent and its child and we are calling this component on diiferent jobs page and giving it a dynamic props by mapping through the json file;

interface jobProp {
    departmentInfo: {
        department: string,
        sub_departments: string[],
    },
    childerenState: boolean[]
}


export default function Job(props: jobProp) {


    const [check, setChecked] = React.useState<boolean[]>(props.childerenState);// state for storing the each child of particular comonent true-->checked false-->not checked
    const [showChilds,setShowChilds]=React.useState<boolean>(true);// state for showing the childs or not

    const checkStateOfChilderen = () => {  //for checking the state of childs means if all childs are true then parent will also be true and if all are falso then parent will also be false
        let flag: boolean = true;
        for (let i = 0; i < check.length; i++) {
            flag = flag && check[i]
        }
        return flag;
    }

    const handleIndeterminateState = () => { //it is a indeterminate state handle of parent checkbox if all childs doesn't have a same state then this state will be true otherwise false
        let flag: boolean = check[0];
        for (let i = 0; i < check.length; i++) {
            console.log(check[i]);
            if (flag !== check[i]) {
                return true;
            }
        }

        return false;
    }

    //it is function used for handling the parent state change that we are making all its childs equal to parent state
    const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const parentState:boolean = e.target.checked;
        const newStateOfChilderen: boolean[] = Array(props.childerenState.length).fill(parentState);
        setChecked(newStateOfChilderen);
    }
    
    //for showing the childs
    const handleAdd=()=>{
        setShowChilds(true);
    }
    // for hiding the childs
    const handleRemove=()=>{
        setShowChilds(false);
    }

    // console.log("check is",check);

    return (
        <>
        
        <div>
           
            <FormControlLabel
                label={props.departmentInfo.department}
                control={
                    <Checkbox
                        checked={checkStateOfChilderen()}
                        indeterminate={handleIndeterminateState()}
                        onChange={handleParentChange}
                    />
                }
            />
            {showChilds?<RemoveCircleOutlineSharpIcon onClick={handleRemove} style={{cursor:"pointer"}}/>:<AddCircleOutlineTwoToneIcon onClick={handleAdd} style={{cursor:"pointer"}}/>}
            {
            showChilds &&
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>

            {
                props.departmentInfo.sub_departments.map((name, index) => {
                    return (
                        <FormControlLabel  
                            key={index}
                            label={name}
                            control={<Checkbox checked={check[index]} onChange={(e) => {
                                let changedChecked = check;
                                console.log(changedChecked);
                                changedChecked[index] = e.target.checked;
                                console.log(changedChecked);

                                
                                setChecked(prevState => {
                                    let changedChecked = [...prevState];
                                    changedChecked[index] = e.target.checked;
                                    return changedChecked;
                                });
                            }}  indeterminate={false} />}
                        />
                    )
                })
            }
        </Box>
    
        }

        </div>
      </>  
    );
}