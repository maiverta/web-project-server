// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from 'react';
import { getCommercials } from '../services/commercialsService';

const card = (name, image, description)=>{
    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
}
const Com = () => {
    const [commercials, setCommercials] = useState([]);
useEffect(async() => {
            const commercialsData = await getCommercials();   
            setCommercials(commercialsData);
        }, [])

    return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
        {
            commercials.map(com=>{
                return       <SwiperSlide>{card(com.name,com.imageLink,com.description)}</SwiperSlide>

            })
        }
    </Swiper>
  );
};
export default Com


