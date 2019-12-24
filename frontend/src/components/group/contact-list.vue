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
                    <f7-accordion-content class="stat-section">
                        <f7-row class="stat-row elevation-2">
                            <f7-col class="stat-box">
                                <span class="stat-box-title">Speed</span>
                                <f7-icon icon="fas fa-walking" size="20"/>
                                <div class="speed-container">
                                    <span>5</span><span>m/s</span>
                                </div>
                            </f7-col>
                            <f7-col class="stat-box">
                                <span class="stat-box-title">Accuracy</span>
                                <f7-icon icon="fas fa-crosshairs" size="20"/>
                                <div class="accuracy-container">
                                    <span>±</span><span>13</span><span>m</span>
                                </div>
                            </f7-col>
                            <f7-col class="stat-box">
                                <span class="stat-box-title">Latency</span>
                                <f7-icon icon="far fa-clock" size="20"/>
                                <div class="latency-container">
                                    <span>130</span><span>ms</span>
                                </div>
                            </f7-col>
                        </f7-row>
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
        border-bottom: #00000033 thin solid;
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

    .stat-row {
        margin: 10px;
        border-radius: 10px;
        background-color: #ddd;
    }

    .stat-box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .stat-box-title {
        padding-bottom: 3px;
    }

    .speed-container, .accuracy-container, .latency-container > * {
        padding: 1px;
    }

    .speed-container > *:first-child {
        font-size: 18px;
    }

    .accuracy-container > *:nth-child(2) {
        font-size: 18px;
    }

    .latency-container > *:first-child {
        font-size: 18px;
    }
</style>