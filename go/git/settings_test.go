package git

import (
	"context"
	"testing"

	"github.com/keybase/client/go/kbtest"
	"github.com/keybase/client/go/protocol/keybase1"
	"github.com/keybase/client/go/teams"
	"github.com/stretchr/testify/require"
)

func TestSettings(t *testing.T) {
	tc := SetupTest(t, "settings", 1)
	defer tc.Cleanup()

	u, err := kbtest.CreateAndSignupFakeUser("t", tc.G)
	require.NoError(t, err)

	teamName := u.Username + "t1"
	_, err = teams.CreateRootTeam(context.Background(), tc.G, teamName, keybase1.TeamSettings{})
	require.NoError(t, err)

	repoName := "repoName"
	repoID := "abc123"
	doPut(t, tc.G, teamName, repoID, repoName)

	arg := keybase1.GetTeamRepoSettingsArg{
		Folder: keybase1.Folder{
			Name:       teamName,
			Private:    true,
			FolderType: keybase1.FolderType_TEAM,
		},
		RepoID: keybase1.RepoID(repoID),
	}
	settings, err := GetTeamRepoSettings(context.Background(), tc.G, arg)
	require.NoError(t, err)

	require.False(t, settings.ChatDisabled)
	require.NotNil(t, settings.ChannelName)
	require.Equal(t, *settings.ChannelName, "general")
}
