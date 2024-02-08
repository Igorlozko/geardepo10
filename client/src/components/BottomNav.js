import { AddLocationAlt, GridView, LocationOn, PostAdd } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ClusterMap from './map/ClusterMap';
import Gears from './gear/Gears';
import AddGear from './addGear/AddGear';
import Protected from './protected/Protected';

const BottomNav = () => {
    const [value, setValue] = useState(0);
    const ref = useRef();
    useEffect(()=>{
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [value]);

    // styling for the map portion 
    


  return (
    <Box ref={ref}>
        {{

            0: <ClusterMap/>,
            1: <Gears/>,
            2: <Protected> 
                    <AddGear setPage = {setValue} />
                </Protected>,
        }[value]}
        <Paper
            elevation={3}
            sx={{position:'fixed',boxShadow: 'none', bottom:0, left:0, right:0, zIndex:2}}
        >
            <BottomNavigation
            showLabels
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            >
                <BottomNavigationAction
                    label ='Map'
                    icon={<LocationOn />}
                />
                <BottomNavigationAction
                    label ='Gear'
                    icon={<GridView/>}
                />
                <BottomNavigationAction
                    label ='Add'
                    icon={<PostAdd/>}
                />
            </BottomNavigation>
        </Paper>
    </Box>
  )
}

export default BottomNav;