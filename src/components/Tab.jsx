import React, { useEffect, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
//MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Delete from '@mui/icons-material/DeleteForeverOutlined';
//redux
import { useDispatch } from 'react-redux';
import { deleteWeekOneMeal } from '../store/WeekOneSlice';
import { deleteWeekTwoMeal } from '../store/WeekTwoSlice';
import { deleteWeekThreeMeal } from '../store/WeekThreeSlice';
import { deleteWeekFourMeal } from '../store/WeekFourSlice';
const Root = styled(Box)(({ theme }) => ({
    margin: 0,
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    "& .card": {

        padding: "14px",
        borderRadius: "10px",
        margin: "20px",
        maxWidth: 300,
        // maxHeight: 650,
        "& .itemImage": {

        },
        "& .mealType": {
            marginTop: "10px",
            marginRight: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "16px",
            // width: "70px",
            borderRadius: "5px",
            backgroundColor: "black",
            padding: "5px 8px",
            "& .mealtypeName": {
                fontSize: "10px",
                color: "#fff"
            }
        },
        "& .itemName": {
            fontWeight: "900"
        },
        "& .textolor": {
            fontSize: "10px",
            color: "#979797"
        },
        "& .rating-box": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
            "& .Cuisine&rating": {

            },
            "& .MuiBox-root": {
                display: "flex",
                alignItems: "center",
                width: '100%',
                "& .rating": {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "10px",
                    // fontWeight: "bold",
                    "& span": {
                        fontWeight: "700"
                    }
                },
                "& .StariconSize": {
                    fontSize: "14px",
                    color: "#4608AD"
                }
            }
        },

    }
}));
function Tab({ meal, getDataFromChild, isSubmitted, setIsSubmitted, selectedTab }) {
    const [selectedMealId, setSelectedMealId] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        if (isSubmitted) {
            setSelectedMealId([]);
            setIsSubmitted(false)
        }
    }, [isSubmitted])
    const handleSelect = (id) => {
        let updatedSelectedIds;

        if (selectedMealId.includes(id)) {
            // If id exists, remove it
            updatedSelectedIds = selectedMealId.filter(selectedId => selectedId !== id);
        } else {
            // If id doesn't exist, add it
            updatedSelectedIds = [...selectedMealId, id];
        }

        // Update the state with the new array
        setSelectedMealId(updatedSelectedIds);
        getDataFromChild(updatedSelectedIds)
    };
    const handleDelete = (id) => {
        if (selectedTab === "Week 1") {
            dispatch(deleteWeekOneMeal(id))
        } else if (selectedTab === "Week 2") {
            dispatch(deleteWeekTwoMeal(id))
        }
        else if (selectedTab === "Week 3") {
            dispatch(deleteWeekThreeMeal(id))
        }
        else {
            dispatch(deleteWeekFourMeal(id))
        }
    }
    return (
        <Root >
            {meal?.length ?
                meal?.map((item, index) => (
                    <Card key={index} onClick={() => handleSelect(item.id)}
                        sx={{
                            border: selectedMealId.includes(item.id) && selectedTab === "All Meals" ? "2px solid #3E6C91" : "",
                        }}
                        className='card'>
                        <CardActionArea>
                            <Box className='itemImage'
                                style={{
                                    width: '100%',
                                    height: '220px',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "start",
                                    backgroundImage: `url(${item.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}>
                                <IconButton sx={{ backgroundColor: selectedTab !== "All Meals" ? "#FFE0E0" : "" }} onClick={() => handleDelete(item.id)}>
                                    {selectedTab !== "All Meals" && <Delete color='error' />}
                                </IconButton>
                                <Box className='mealType'>
                                    <Typography className='mealtypeName'>
                                        {item.mealType}
                                    </Typography>
                                </Box>
                            </Box>
                            <CardContent sx={{ paddingBottom: "0px" }}>
                                <Typography variant="subtitle1" className='itemName' gutterBottom component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" className='textolor'>
                                    {item.instructions}
                                </Typography>
                                <Box className='rating-box'>
                                    <Box className='Cuisine&rating'>
                                        <Typography className='rating' variant="body2">
                                            <span> cuisine:</span> {item.cuisine}
                                        </Typography>

                                    </Box>
                                    <Box className='Cuisine&rating'>
                                        <Typography className='rating' variant="body2">
                                            <span> Rating:</span>   {item.rating}
                                        </Typography>

                                        <Rating name="half-rating" sx={{ fontSize: 16, color: "#004370" }} readOnly value={item.rating} precision={0.5} />
                                    </Box>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )) :
                <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", width: "100%", marginTop: "50px" }}>
                    <Typography variant="h6" gutterBottom component="div"> No Meal Selected For This Week</Typography>
                </Box>
            }
        </Root>
    )
}

export default Tab
