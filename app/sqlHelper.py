import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, text, func
import datetime

import pandas as pd
import numpy as np

# The Purpose of this Class is to separate out any Database logic
class SQLHelper():
    #################################################
    # Database Setup
    #################################################

    # define properties
    def __init__(self):
        self.engine = create_engine("sqlite:///covid.sqlite")
        # self.Base = None

        # automap Base classes
    #     self.init_base()

    # def init_base(self):
    #     # reflect an existing database into a new model
    #     self.Base = automap_base()
    #     # reflect the tables
    #     self.Base.prepare(autoload_with=self.engine)

    #################################################
    # Database Queries
    #################################################

    
    # same thing with RAW SQL
    def get_stack(self, min_total_cases, user_continent):
        # user inputs
        # user_continent = 'North America'
        # min_total_cases = 10000

        # switch on user_region
        if user_continent == 'All':
            where_clause = "1=1"
        else:
            where_clause = f"Continent = '{user_continent}'"

        query = f"""
                    SELECT
                        "Total Cases",
                        "Total Deaths",
                        "Total Recovered",
                        Continent,
                        Country
                                            
                    From 
                        covid
                    Where
                        "Total Cases" >= {min_total_cases} AND
                    {where_clause}
                    Order by 
                        "Total Cases" DESC
                    LIMIT 10;
                    """
        df = pd.read_sql(text(query), con = self.engine)
        data = df.to_dict(orient="records")
        return(data)

    def get_sunburst(self, min_total_cases, user_continent):
        # user inputs
        # user_continent = 'North America'
        # min_total_cases = 10000

        # switch on user_region
        if user_continent == 'All':
            where_clause = " 1=1"
        else:
            where_clause = f"Continent = '{user_continent}'"

        query = f"""
                    SELECT 
                        "Total Cases",
                        "Active Cases",
                        "Total Recovered",
                        Continent,
                        Country,
                        Population
                                
                    From 
                        covid
                    Where
                        "Total Cases" >= {min_total_cases} AND
                    {where_clause}
                    ;
                    
                    """
        df = pd.read_sql(text(query), con = self.engine)
        data = df.to_dict(orient="records")
        return(data)
    
    def get_table(self, min_total_cases, user_continent):
        # user inputs
        # user_continent = 'North America'
        # total_cases = 10000

        # switch on user_region
        if user_continent == 'All':
            where_clause = "1=1"
        else:
            where_clause = f"Continent = '{user_continent}'"

        query = f"""
                    SELECT
                        "Population",
                        "Total Test",
                        "Total Cases",
                        "Active Cases",
                        "Total Deaths",
                        "Total Recovered",
                        Continent,
                        Country
                                            
                    From 
                        covid
                    Where
                        "Total Cases" >= {min_total_cases} AND
                    {where_clause}
                    Order by 
                        "Total Cases" DESC;
                    
                    """
        df = pd.read_sql(text(query), con = self.engine)
        data = df.to_dict(orient="records")
        return(data)        
    
    def get_map(self, min_total_cases, user_continent):
# user inputs
        # user_continent = 'North America'
        # min_total_cases = 10000

        # switch on user_region
        if user_continent == 'All':
            where_clause = "1=1"
        else:
            where_clause = f"Continent = '{user_continent}'"

        query = f"""
                    SELECT
                        "Population",
                        "Total Test",
                        "Total Cases",
                        "Active Cases",
                        "Total Deaths",
                        "Total Recovered",
                        Continent,
                        Country
                                            
                    From 
                        covid
                    Where
                        "Total Cases" >= {min_total_cases} AND
                    {where_clause}
                    Order by 
                        "Total Cases" DESC;
                    
                    """
        df = pd.read_sql(text(query), con = self.engine)
        data = df.to_dict(orient="records")
        return(data)