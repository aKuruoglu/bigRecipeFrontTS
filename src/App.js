import React from 'react';
import 'react-sortable-tree/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import WrapComponent from './components/WrapComponent';
import Home from './entities/Home';
import Recipe from './entities/Recipes/Recipe';
import Article from './entities/Articles/Article';
import Category from './entities/Categories/Category';
import RecipeById from './entities/Recipes/RecipeById';
import RecipeEdit from './entities/Recipes/RecipeEdit';
import RecipeAdd from './entities/Recipes/RecipeAdd';
import RecipeEditCategory from './entities/Recipes/RecipeEditCategory';

function App () {
  return (
    <WrapComponent>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/recipe/:id/edit/category" component={ RecipeEditCategory } />
        <Route exact path="/recipe/edit/:id" component={ RecipeEdit } />
        <Route exact path="/recipe/add" component={ RecipeAdd } />
        <Route exact path="/recipe/:id" component={ RecipeById } />
        <Route exact path="/recipe" component={ Recipe } />
        <Route exact path="/recipe/page/:page" component={ Recipe } />
        <Route exact path="/article/category/:catId/page/:page" component={ Article } />
        <Route exact path="/article/category/:catId" component={ Article } />
        <Route exact path="/article/page/:page" component={ Article } />
        <Route exact path="/article" component={ Article } />
        <Route exact path="/recipe/category/:catId" component={ Recipe } />
        <Route exact path="/recipe/category/:catId/page/:page" component={ Recipe } />
        <Route exact path="/category" component={ Category } />
        <Route render={ () => <p>Not found</p> } />
      </Switch>
    </WrapComponent>
  );
}

export default App;
