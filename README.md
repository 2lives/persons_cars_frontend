## Starting the frontend

1) Clone the repo

2) cd into the directory and run: ```yarn && yarn start ```

3) Confirm (Y) when prompted to start on a different port

## Known issues

1) UI bug: After selecting a user from dropdown when creating a car, the select field doesn't reset upon creation and selecting the same user (or leaving it selected) will result in nothing happening if another creation is attempted. Only upon clicking an alternative user and re-selecting the previous, will a car be added to the first user.

2) Console error from using Material UI's inputRef over ref (findDOMNode is deprecated) 

