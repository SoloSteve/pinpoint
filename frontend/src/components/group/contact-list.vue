<template>
    <div>
        <f7-list-index
                indexes="auto"
                list-el=".list.contacts-list"
                :scroll-list="true"
                :label="true"
        />
        <f7-list contacts-list>
            <f7-list-group v-for="letterGroup in Object.entries(contacts)">
                <f7-list-item :title="letterGroup[0]" group-title/>
                <f7-list-item
                        v-for="user in letterGroup[1]"
                        :title="capitalize(user.name)"
                        footer="Online"
                        class="user-container"
                        accordion-item
                >
                    <div slot="media" class="avatar-container">
                        <img src="/static/icons/avatars/standing_man.svg" alt="User"/>
                    </div>
                    <f7-accordion-content>

                    </f7-accordion-content>
                </f7-list-item>
            </f7-list-group>
        </f7-list>
    </div>
</template>

<script>
  import {capitalize} from 'lodash';

  export default {
    name: "contact-list",
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

    .item-inner:after {
        background-color: black !important;
    }
</style>