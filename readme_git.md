#GitHub

## Creating a branch
1. git checkout -b branch-name.
2. git push -u origin branch-name. // Always do this after creating a new branch

## Pulling changes from main branch
1. git checkout branch-name.
2. git fetch origin main.
2. git merge origin branch-name

## Push changes to own brach
1. git add .
2. git commit -m "message of your own"
3. git push


## Delete branch
1. git checkout main
2. git branch -D <branch-name>
3. git push origin --delete <branch-name>

## Pushing changes to main branch
1. Always check if there are changes in the main branch before pushing.
1.1 If there are changes. Pull the changes first from the main branch.

2. If there are no changes. Push the changes to your branch and create a PR(Pull Request) from your `branchName-to-main`
2.1 If there are conflict in your PR, fix it. If you don't know how to fix it, ask for help sakon.

3. Merge the PR.

kyla

jireh practicing version control xx