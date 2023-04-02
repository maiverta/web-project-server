import { useNavigate } from "react-router-dom";
import "./Post.scss";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';






const Post = (props) => {
    const {title, text, imageLink, videoLink, authorEmail, createDate, id, tag, likesUsers} = props
    const navigate = useNavigate();
    
    return (
        <Card sx={{ width: '345px', height: '345px', marginRight:'50px'}}
        onClick={()=> navigate(`/posts/${id}`)}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {authorEmail}
            </Avatar>
          }
          title={title}
          subheader={createDate}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageLink}
          alt={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          {text}
          </Typography>
        </CardContent>
        { {videoLink} && <CardContent>
         
        </CardContent>}
      </Card>
    )
}

export default Post





// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function RecipeReviewCard() {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             {authorEmail}
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={title}
//         subheader={createDate}
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image={imageLink}
//         alt={title}
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//         {text}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }
