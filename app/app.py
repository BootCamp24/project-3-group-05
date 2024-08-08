from flask import Flask, jsonify, render_template
import pandas as pd
import numpy as np
from sqlHelper import SQLHelper

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
sql = SQLHelper()

#################################################
# Flask Routes
#################################################
# HTML Routes
@app.route("/")
def index():
    return render_template("home.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/about_us")
def about_us():
    return render_template("about_us.html")

@app.route("/citation")
def citation():
    return render_template("citation.html")


# SQL Queries
@app.route("/api/v1.0/get_dashboard/<min_total_cases>/<user_continent>")
def get_dashboard(min_total_cases,user_continent):
    min_total_cases = int(min_total_cases)
    stack_data = sql.get_stack(min_total_cases,user_continent)
    sunburst_data = sql.get_sunburst(min_total_cases,user_continent)
    table_data = sql.get_table(min_total_cases,user_continent)

    data = {
        "stack_data":stack_data,
        "sunburst_data":sunburst_data,
        "table_data":table_data
    }
    return(jsonify(data))

@app.route("/api/v1.0/get_map/<min_total_cases>/<user_continent>")
def get_map(min_total_cases,user_continent):

    map_data = sql.get_map(min_total_cases,user_continent)

    return(jsonify(map_data))


# Run the App
if __name__ == '__main__':
    app.run(debug=True)
