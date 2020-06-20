<template>
  <div>
    <f7-list-index
        :label="true"
        :scroll-list="true"
        indexes="auto"
        list-el=".list.contacts-list"
    />
    <f7-list contacts-list>
      <f7-list-group :key="letterGroup[0]" v-for="letterGroup in Object.entries(contacts)">
        <f7-list-item :title="letterGroup[0]" group-title/>
        <f7-list-item
            :key="user.id"
            :title="capitalize(user.name)"
            accordion-item
            class="user-container"
            footer="Online"
            v-for="user in letterGroup[1]"
        >
          <div class="avatar-container" slot="media">
            <img alt="User" src="/static/icons/avatars/standing_man.svg"/>
          </div>
          <f7-accordion-content class="stat-section">
            <statistics
                :accuracy="user.position ? user.position.accuracy : undefined"
                :latency="user.latency"
                :speed="user.position ? user.position.speed : undefined"
            />
          </f7-accordion-content>
        </f7-list-item>
      </f7-list-group>
    </f7-list>
  </div>
</template>

<script>
  import {capitalize} from 'lodash';
  import Statistics from "./statistics";

  export default {
    name: "contact-list",
    components: {Statistics},
    props: {
      users: {
        type: Array,
        required: true,
      }
    },
    computed: {
      contacts() {
        const contactGroup = {};
        this.users
          .sort((a, b) => a.name.localeCompare(b.name, 'en', {sensitivity: 'accent'}))
          .forEach((user) => {
            const firstLetter = user.name[0].toUpperCase();
            if (!contactGroup.hasOwnProperty(firstLetter)) {
              contactGroup[firstLetter] = [];
            }
            contactGroup[firstLetter].push(user);
          });
        return contactGroup;
      }
    },
    methods: {
      capitalize(string) {
        return capitalize(string);
      }
    }
  }
</script>

<style scoped>
  .list-index {
    position: fixed;
  }

  .user-container {
    background-color: #eeeeee;
  }

  .avatar-container {
    background-color: lightgray;
    border-radius: 10px;

    display: flex;
    justify-content: center;

    padding: 2px 0;
  }

</style>
<style>
  .list-group > ul:after {
    background-color: black;
  }

  .item-inner:after {
    background-color: gray !important;
  }

  .accordion-item-opened {
    background-color: lightgoldenrodyellow !important;
  }
</style>