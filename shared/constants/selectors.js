// @flow
// Not use util/container as we have import loops otherwise
import {Set} from 'immutable'
import {createSelector} from 'reselect'
import {type TypedState} from './reducer'
import {type SearchQuery} from './types/search'

const usernameSelector = (state: TypedState) => state.config.username
const loggedInSelector = (state: TypedState) => state.config.loggedIn

const cachedSearchResults = (
  {entities: {search: {searchQueryToResult}}}: TypedState,
  searchQuery: SearchQuery
) => searchQueryToResult.get(searchQuery)

const searchResultSelector = ({entities: {search: {searchResults}}}: TypedState, username: string) => {
  return searchResults.get(username)
}

const previousConversationSelector = ({chat: {previousConversation}}: TypedState) => previousConversation

const amIFollowing = (state: TypedState, otherUser: string) => state.config.following.has(otherUser)
const amIBeingFollowed = (state: TypedState, otherUser: string) => state.config.followers.has(otherUser)

const userIsInTeam = (
  {entities: {teams: {teamNameToMemberUsernames}}}: TypedState,
  teamname: string,
  username: string
) => {
  return teamNameToMemberUsernames.getIn([teamname, username])
}

const searchResultMapSelector = createSelector(
  ({entities: {search: {searchResults}}}: TypedState) => searchResults,
  searchResults => searchResults
)

const teamMembersSelector = (state, {teamname}) =>
  state.entities.getIn(['teams', 'teamNameToMembers', teamname], Set())
const teamMemberRecordSelector = createSelector(
  [usernameSelector, teamMembersSelector],
  (username, members) => members.find(member => member.username === username)
)

export {
  amIBeingFollowed,
  amIFollowing,
  cachedSearchResults,
  loggedInSelector,
  previousConversationSelector,
  searchResultMapSelector,
  searchResultSelector,
  teamMemberRecordSelector,
  userIsInTeam,
  usernameSelector,
}
