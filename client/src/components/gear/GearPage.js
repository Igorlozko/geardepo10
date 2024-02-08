import { AppBar, Box, Container, Dialog, Divider, IconButton, Rating, Slide, Stack, Toolbar, Typography } from '@mui/material'
import { useValue } from '../../context/ContextProvider'
import { forwardRef, useEffect, useState } from 'react';
import { Close, StarBorder } from '@mui/icons-material';
import Gears from './Gears';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import mapboxgl from 'mapbox-gl';

const Transition = forwardRef((props, ref)=>{
    return <Slide direction='up'{...props} ref={ref}/>
})

const GearPage = () => {
    const {state:{gear}, dispatch} = useValue();
    const [place, setPlace] = useState(null);
    const [map, setMap] = useState(null);

    useEffect(()=>{
        if(gear){
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${gear.lng},${gear.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
            fetch(url)
                .then(response => response.json())
                .then((data) => {
                    setPlace(data.features[0]);
                    initializeMap(data.features[0].center);
                });
        }
    },[gear])

    const handleClose = ()=>{
        dispatch({type:'UPDATE_GEAR', payload: null})
    }

    const initializeMap = (center) => {
        mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center,
            zoom: 12
        });
        new mapboxgl.Marker()
            .setLngLat(center)
            .addTo(map);
        setMap(map);
    }

    return (
        <Dialog
            fullScreen
            open={Boolean(gear)}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <IconButton
                        color='black'
                        onClick={handleClose}
                        elevation={0}
            >
                <AppBar position='relative' elevation={0} sx={{ backgroundColor: ' #ff4e53' }}>
                    <Toolbar  sx={{ justifyContent: 'center' }}>
                        
                            <Close/>
                        
                        <Typography variant="h6" color="white" sx={{ ml: 1, alignItems:'center', fontWeight: 400 }} >Close</Typography>
                    </Toolbar>
                    <Divider/>
                </AppBar>
            </IconButton>
            <Container sx={{pt:1}}>
                <Stack sx={{p:1}} spacing={2}>
                    <Box style={{ maxWidth: '80%', margin: 'auto' }}>
                    <Carousel showArrows={true} showThumbs={true} renderArrowPrev={(onClickHandler, hasPrev, label) =>
                            hasPrev && (
                                <button type="button" onClick={onClickHandler} title={label} style={{ position: 'absolute', zIndex: 2, left: 15, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '10px' }}>
                                    &lt;
                                </button>
                            )
                        } renderArrowNext={(onClickHandler, hasNext, label) =>
                            hasNext && (
                                <button type="button" onClick={onClickHandler} title={label} style={{ position: 'absolute', zIndex: 2, right: 15, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0, 0, 0, 0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '10px' }}>
                                    &gt;
                                </button>
                            )
                        }>
                            {gear?.images?.map((url, index) => (
                                <div key={index}>
                                    <img src={url} alt={`image-${index}`} style={{ maxWidth: '60%', height: 'auto' }} />
                                </div>
                            ))}
                    </Carousel>
                    </Box>
                    <Divider/>
                    <Box sx={{ display: 'flex', justifyContent:'left' }}>
                        <Typography
                            variant='h4'
                            component='h3'
                            sx={{
                                color: 'black',
                                mb: 2, // Add margin bottom to the title for spacing
                                fontWeight: 500 
                            }}
                                >
                            {gear?.title}
                        </Typography>
                    </Box>
                    <Divider/>
                    <Stack direction="row" sx={{justifyContent:'space-between',flexWrap:'wrap'}}>
                        <Box>
                            <Typography variant='h6' component='span'>{'Price per day: '}</Typography>
                            <Typography component='span' >{gear?.price === 0 ? 'Free rental': '€'+gear?.price}</Typography>
                        </Box>
                        <Box sx={{display:'flex',alignItems: 'center'}}>
                            <Typography variant='h6' component='span'>{'Rating: '}</Typography>
                            <Rating
                                name='gear-rating'
                                defaultValue={4}
                                precision={0.5}
                                emptyIcon={<StarBorder/>}
                            />
                        </Box>
                    </Stack>
                    <Stack direction="row" sx={{justifyContent:'space-between',flexWrap:'wrap'}}>
                        <Box>
                            <Typography variant='h6' component='span'>{'Location: '}</Typography>
                            <Typography component='span' > {place?.text}</Typography>
                        </Box>
                    </Stack>
                    <Stack>
                        <Typography variant='h6' component='span'>{'Description: '}</Typography>
                        <Typography component='span' > {gear?.description}</Typography>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" sx={{justifyContent:'space-between',flexWrap:'wrap'}}>
                    <Box sx={{display:'flex-column',alignItems: 'center'}}>
                            <Typography variant='h6' component='span'>{'Address: '}</Typography>
                            <Typography component='span' > {place?.place_name}</Typography>
                    </Box>
                    </Stack>
                    <Box id="map" style={{ width: '100%', height: '300px' }} />
                </Stack>
            </Container>
        </Dialog>
    )
}

export default GearPage;
