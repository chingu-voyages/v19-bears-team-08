<template>
  <div>
    <div class="flex"></div>
    <img
      v-if="user.avatar_url"
      :src="user.avatar_url"
      alt="profile img"
      class="border-green border-2 w-64"
    />
    <h2 class="">{{ user.name }}</h2>
    <h4 class="mb-2 text-gray-800">{{ user.username }}</h4>

    <div>
      <a v-if="user.html_url" :href="user.html_url" target="_blank">
        View on GitHub
      </a>
      <a v-if="user.blog" :href="user.blog" target="_blank">
        View Blog
      </a>
      <a v-if="user.email" :href="`mailto:${user.email}`" target="_blank">
        Send an Email
      </a>
      <p>{{ user.repos_url }}</p>
      <p>{{ user.blog }}</p>
      <p>{{ user.location }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.hireable }}</p>
      <p>{{ user.bio }}</p>
      <p>{{ user.twitter_username }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

type UserType = {
  // from chingu user objects
  _id?: string;
  activeMember?: boolean;
  name?: string;
  email?: string;
  creationDate?: string;
  // from github profile if provided
  username?: string;
  avatar_url?: string;
  html_url?: string;
  repos_url?: string;
  blog?: string;
  location?: string;
  hireable?: boolean;
  bio?: string;
  twitter_username?: string;
  repos?: [];
};

type RepoType = {};

@Component({
  middleware: 'auth',
  head(this: Profile) {
    return {
      title: `${this.user.name} | Profile | Chingu`,
    };
  },
  asyncData({ params, error, $axios }): Promise<void | { user: UserType }> {
    return $axios
      .get(`/user?userId=${params.userId}`)
      .then((res: any) => {
        const user = res.data.user;
        const githubUsername = user.githubUsername;

        // if there's no github username linked just send the chingu user object
        if (!githubUsername) return { user };

        // use the github username to get additional information
        // https://developer.github.com/v3/users/#get-a-user
        return $axios
          .get(`https://api.github.com/users/${githubUsername}`)
          .then((resGithub: any) => ({
            user: {
              ...resGithub.data,
              ...user,
            },
          }))
          .catch(() => ({ user }));
      })
      .catch(() =>
        error({ statusCode: 404, message: `Sorry, we couldn't find that user` })
      );
  },
})
export default class Profile extends Vue {
  user: UserType = {};
}
</script>

<style></style>
