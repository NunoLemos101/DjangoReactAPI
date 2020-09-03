import React from 'react'

export function SearchNavBar(props) {
    return  <form id="search_bar_form" style={{textAlign : "right"}} className="blue-background-search">
                <a type="button" data-toggle="modal" data-target="#exampleModal" className="fa fa-plus-circle plus-hover"></a>
                <a type="button" style={{marginLeft : "15px"}} className="fa fa-search search_icon"></a>
                <input id="search_bar_input" className="search-bar" type="search" placeholder=" Search..." aria-label="Search"></input>
            </form> 
}