# Main System Prototype

**_Please remember to setup the ip addresses in ./control/config.js if you are setting up a new server instance_**

## Basic Structure
-*./dashboard.html*
The interface of Project Management Dashboard

-*./criterial.html and ./criteriaV6.0.html
The interface of KPI evidence dashboard

-*./control*
Holds the business logic for loading and event handling those interfaces

-*./model*
Handles communication with Activiti (BPMN engine), which controls the workflow of tasks in a project

-*./model_api_server*
Handles communication with MongoDB/NodeJS server, which is stores internal data of the system (e.g. project id, factors settings, etc.)

-*./model_dna_server*
Handles communication with OrientDB(Data Normalization Architecture) server, which stores project data

-*./model_repo_server*
Handles communication with code analysis result. Currently not used

-*./model_risk_server*
Handles communication with the risk prediction engine API

-*./model_rule_server*
Handles communication with the KIE-DROOLS (Rule engine), which we used in the early stage

-*./start_page*
Contains the factor input interfaces of the system prototype

-*./risk_calculator*
Contains the risk assessment interfaces of the system prototype

-*./css ./lib ./img*
Are the stylesheets, UI libraries and image source of this prototype 

