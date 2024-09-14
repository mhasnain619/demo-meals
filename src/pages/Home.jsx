import { Box, Button, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
//MUI

import { styled } from '@mui/material/styles';
import Image from '../assets/bg.jpg'
import Tab from '../components/Tab';
import { MealServices } from '../Services/MealService';
//Diaog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
//Redux
import { useDispatch } from 'react-redux';
import { addMeal } from '../store/mealSlice';
import { useSelector } from 'react-redux';
import { addWeekOneMeal } from '../store/WeekOneSlice';
import { addWeekThreeMeal } from '../store/WeekThreeSlice';
import { addWeekFourMeal } from '../store/WeekFourSlice';
import { addWeekTwoMeal } from '../store/WeekTwoSlice';

const Root = styled(Box)(({ theme }) => ({
    margin: 0,
    padding: 0,
    "& .backGroundImage": {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex: 1,
        height: '40vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& .optimizedMeal": {
            fontSize: "40px",
            fontWeight: "800",

        },
        "& p": {
            textAlign: "center"
        }
    },
    "& .weekOrderBox": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& .weakOrder": {
            [theme.breakpoints.down('sm')]: {
                textAlign: "center"
            },
            padding: "30px",
            fontSize: "20px",
            fontWeight: "900"
        }
    },
    "& .tabBox": {
        background: "#fff",
        display: "flex",
        paddingTop: "15px !important",
        paddingBottom: "15px !important",
        "& .tabs": {
            [theme.breakpoints.down('sm')]: {
                flex: "0 1 90%",
            },
            flex: "0 1 70%",
            display: "flex",
            margin: "auto",
            justifyContent: "space-between",
            "& .addtoMealBtn": {
                textTransform: "none",
                backgroundColor: "#004370 !important",
                padding: "0px 40px",
                [theme.breakpoints.down('sm')]: {
                    padding: "0px 10px",
                },
            },
            "& .addtoMealBtnDisable": {
                textTransform: "none",
                backgroundColor: "#9B9B9B !important",
                padding: "5px 40px",
                color: "#fff",
                [theme.breakpoints.down('sm')]: {
                    padding: "0px 10px",
                },
            },
            "& .tab-list": {
                cursor: "pointer",
                display: "inline-block",
                margin: "4px 0",
                padding: "5px 0",
                "& .mealName": {
                    fontSize: "12px",
                    fontWeight: "600",
                }
            }
        },
    },
    "& .mealBox": {
        background: "#FAE9F6",
        display: "flex",
        "& .meals": {
            flex: "0 1 80%",
            margin: "auto",
            paddingY: 10
        },
    },
}));
const ActionDialog = styled(Dialog)(({ theme }) => ({
    // "& button": {
    //     textTransform: "none",
    //     padding: "5px 25px !important"
    // },
    "& .addtoMealBtn": {
        textTransform: "none",
        backgroundColor: "#004370 !important",
        padding: "5px 40px",

    },

    "& .dialog-content": {
        display: "flex",
        gap: "10px",
        "& .items": {
            borderRadius: "4px",
            padding: "5px 15px",
            cursor: "pointer",

            [theme.breakpoints.down('sm')]: {
                padding: "5px 12px",
                "& p": {
                    fontSize: "12px",
                },
            },
        }
    }
}));
function Home() {
    const [meal, setMeal] = useState([])
    const [selectedTab, setSelectedTab] = useState('All Meals');
    const [open, setOpen] = useState(false);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState('Week 1');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const List = ["Week 1", "Week 2", "Week 3", "Week 4"]
    const meals = useSelector((state) => state.meal.data);
    const WeekOneData = useSelector((state) => state.WeekOne.data);
    const WeekTwoData = useSelector((state) => state.WeekTwo.data);
    const WeekThreeData = useSelector((state) => state.WeekThree.data);
    const WeekFourData = useSelector((state) => state.WeekFour.data);
    const tabList = [
        { id: "1", name: "All Meals" },
        { id: "2", name: "Week 1" },
        { id: "3", name: "Week 2" },
        { id: "4", name: "Week 3" },
        { id: "5", name: "Week 4" },
    ]

    useEffect(() => {
        getAllMeal()
    }, [])
    useEffect(() => {
        if (selectedTab === "Week 1") {
            setMeal(WeekOneData);
        } else if (selectedTab === "Week 2") {
            setMeal(WeekTwoData);
        }
        else if (selectedTab === "Week 3") {
            setMeal(WeekThreeData);
        }
        else if (selectedTab === "Week 4") {
            setMeal(WeekFourData);
        } else {
            setMeal(meals)
        }
    }, [WeekOneData, WeekTwoData, WeekThreeData, WeekFourData])
    const getAllMeal = async () => {
        let res = await MealServices.getMealData()
        if (res) {
            setMeal(res.recipes)
            dispatch(addMeal(res.recipes));
        }
    }
    const getDataFromChild = (value) => {
        setSelectedMeals(value)
    }
    const handleSelectWeek = (value) => {
        setSelectedWeek(value)
    }
    const handleTabChange = (value) => {
        setSelectedTab(value)
        if (value === "Week 1") {
            setMeal(WeekOneData);
        } else if (value === "Week 2") {
            setMeal(WeekTwoData);
        }
        else if (value === "Week 3") {
            setMeal(WeekThreeData);
        }
        else if (value === "Week 4") {
            setMeal(WeekFourData);
        } else {
            setMeal(meals)
        }
    }
    const handleSaveMeal = () => {
        const filteredMeals = meals.filter(meal => selectedMeals.includes(meal.id));
        if (selectedWeek === "Week 1") {
            const meal = [
                ...filteredMeals,
                ...WeekOneData.filter(itemB => !filteredMeals.some(itemA => itemA.id === itemB.id)) // Filter out items with duplicate IDs
            ];
            dispatch(addWeekOneMeal(meal));
        } else if (selectedWeek === "Week 2") {
            const meal = [
                ...filteredMeals,
                ...WeekTwoData.filter(itemB => !filteredMeals.some(itemA => itemA.id === itemB.id)) // Filter out items with duplicate IDs
            ];
            dispatch(addWeekTwoMeal(meal));
        }
        else if (selectedWeek === "Week 3") {
            const meal = [
                ...filteredMeals,
                ...WeekThreeData.filter(itemB => !filteredMeals.some(itemA => itemA.id === itemB.id)) // Filter out items with duplicate IDs
            ];
            dispatch(addWeekThreeMeal(meal));
        }
        else {
            const meal = [
                ...filteredMeals,
                ...WeekFourData.filter(itemB => !filteredMeals.some(itemA => itemA.id === itemB.id)) // Filter out items with duplicate IDs
            ];
            dispatch(addWeekFourMeal(meal));
        }
        setOpen(false);
        setSelectedMeals([])
        setIsSubmitted(true)
    }
    return (
        <Root>
            <Grid2 sx={{ backgroundColor: "#FAE9F6" }}>
                <Grid2 item xs={12}
                    style={{
                        backgroundImage: `url(${Image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                    }}>
                    <Box className='backGroundImage'>
                        <Typography className='optimizedMeal'>Optimized Your Meal</Typography>
                        <Typography>Select Meal to Add in Week. You will be able to edit, modify and change the Meal Weeks.</Typography>
                    </Box>
                </Grid2>
                <Grid2 className='weekOrderBox' item xs={12}>
                    <Box sx={{ width: '80%' }}>
                        <Typography className='weakOrder'>Week Orders</Typography>
                    </Box>
                </Grid2>
                <Box className='tabBox' >
                    <Box className="tabs">
                        {tabList.map((item, index) => (
                            <Box key={index} onClick={() => handleTabChange(item.name)} sx={{ borderBottom: selectedTab === item.name ? "4px solid #4608AD" : "", }} className="tab-list">
                                <Typography className='mealName'>{item.name}</Typography>
                            </Box>
                        ))}
                        <Button className={!selectedMeals?.length || selectedTab !== "All Meals" ? "addtoMealBtnDisable" : 'addtoMealBtn'} disabled={!selectedMeals?.length || selectedTab !== "All Meals"} onClick={handleClickOpen} size='small' variant='contained'>Add to Week</Button>
                    </Box>
                </Box>
                <Box className='mealBox' >
                    <Box className='meals' >
                        <Tab setIsSubmitted={setIsSubmitted} selectedTab={selectedTab} isSubmitted={isSubmitted} getDataFromChild={getDataFromChild} meal={meal} />
                    </Box>
                </Box>
            </Grid2>
            <ActionDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle textAlign='center' id="alert-dialog-title">
                    Select Week
                </DialogTitle>
                <DialogContent className='dialog-content'>
                    {List.map((el, ind) => (
                        <Box key={ind} sx={{ backgroundColor: selectedWeek === el ? "#CFECFF" : "#F2F2F2" }} onClick={() => handleSelectWeek(el)} className='items'>
                            <Typography className='dialogTitle'>{el}</Typography>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center !important", }} >
                    <Button className='addtoMealBtn' variant='contained' onClick={handleSaveMeal} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </ActionDialog>
        </Root >

    )
}

export default Home
