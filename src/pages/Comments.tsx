import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Job from "../components/Job";
import departments from "../departments.json"

interface Post {
  postId: number;
  id: number,
  name: string,
  email: string,
  body: string
}

function Comments() {
  const [posts, setPosts] = useState<Post[]>([]);
  const columns: GridColDef[] = [
    { field: 'postId', headerName: 'Post Id', width: 70, type: 'number' },
    { field: 'id', headerName: 'Id', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      type: 'number',
      width: 90,

    },
    {
      field: 'body',
      headerName: 'Body',

      width: 160,

    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/comments");
      const details = await response.json();
      console.log(details)
      setPosts(details)
    }
    fetchData();
  }, [])

  return (
    <div>
      
      {posts.length !== 0 ?
        <div   style={{
          display :"flex",
          gap:"30px",
          justifyContent:"space-around"
        }}>
          <div>
            <h2 style={{
              textAlign: 'center'
            }}
            >Choose Department</h2>
            {
              departments.map((department) => {
                const totalChilderen: number = department.sub_departments.length;
                const childerenState: boolean[] = Array(totalChilderen).fill(false);
                return <Job departmentInfo={department} childerenState={childerenState} />
              })
            }
          </div>

        <div>
          <h2>Users Comments</h2>
          <Box sx={{  width: '100%' }}>
            
            <DataGrid
              rows={posts}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
          </div>
        </div>
          
        :
        <Box sx={{ display: 'flex', justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      }

    </div>
  )

}


export default Comments
