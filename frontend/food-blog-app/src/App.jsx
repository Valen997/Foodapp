import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import  AddFoodRecipe  from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'
import ErrorBoundary from './components/ErrorBoundary'

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

const getAllRecipes=async()=>{
  let allRecipes=[]
  await axios.get(`${API_URL}/recipe`).then(res=>{
    allRecipes=res.data
  })
  return allRecipes
}

const getMyRecipes=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}

const getFavRecipes=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

const getRecipe=async({params})=>{
  let recipe;
  await axios.get(`${API_URL}/recipe/${params.id}`)
  .then(res=>recipe=res.data)

  await axios.get(`${API_URL}/user/${recipe.createdBy}`)
  .then(res=>{
    recipe={...recipe,email:res.data.email}
  })

  return recipe
}

const router=createBrowserRouter([
  {path:"/",element:<MainNavigation/>,errorElement:<ErrorBoundary/>,children:[
    {path:"/",element:<Home/>,loader:getAllRecipes,errorElement:<ErrorBoundary/>},
    {path:"/myRecipe",element:<Home/>,loader:getMyRecipes,errorElement:<ErrorBoundary/>},
    {path:"/favRecipe",element:<Home/>,loader:getFavRecipes,errorElement:<ErrorBoundary/>},
    {path:"/addRecipe",element:<AddFoodRecipe/>,errorElement:<ErrorBoundary/>},
    {path:"/editRecipe/:id",element:<EditRecipe/>,errorElement:<ErrorBoundary/>},
    {path:"/recipe/:id",element:<RecipeDetails/>,loader:getRecipe,errorElement:<ErrorBoundary/>}
  ]}
 
])

export default function App() {
  return (
   <>
   <RouterProvider router={router}></RouterProvider>
   </>
  )
}