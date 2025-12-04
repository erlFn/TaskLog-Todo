<Rules>
1. Other user's cannot be able to see the other users task-log
2. Other user's cannot be able to delete or update other users task-log
3. Only an admin role can delete, and overview/see the task-lo

<Content>
- A task log file must contain the ff;
01. Title
02. Description
03. Status ['To Do', 'In Progres', 'In Review', 'Done', 'Closed']
03.1
    Status values: ['to_do', 'in_progress', 'in_review, 'done', 'closed]
04. Priority ['Low', 'Normal', 'High', 'Urgent']
04.1
    Priority values: ['low', 'normal', 'high', 'urgent']

<UI>
- Task Log should have a table-type design
<!-- ------------------------------- -->
<!-- | Title || Status || Priority | -->
<!-- ------------------------------- -->

- If a specific table row is clicked, it should open a Dialog that contain all the data from a specific row that is clicked.