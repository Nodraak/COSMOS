/*
# Copyright 2021 Ball Aerospace & Technologies Corp.
# All Rights Reserved.
#
# This program is free software; you can modify and/or redistribute it
# under the terms of the GNU Affero General Public License
# as published by the Free Software Foundation; version 3 with
# attribution addendums as found in the LICENSE.txt
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# This program may also be used under the terms of a commercial or
# enterprise edition license of COSMOS if purchased from the
# copyright holder
*/

import { format, add } from 'date-fns'

function formatTime(date) {
  return format(date, 'HH:mm:ss')
}
function formatDate(date) {
  return format(date, 'yyyy-MM-dd')
}

describe('Timeline', () => {
  beforeEach(() => {
    cy.visit('/tools/timeline')
    cy.hideNav()
    cy.wait(1000)
  })

  afterEach(() => {
    //
  })

  it('create new timeline', function () {
    cy.get('[data-test=createTimeline]').click({ force: true })
    cy.get('[data-test=inputTimelineName]').type('Alpha')
    cy.get('[data-test=create-cancel-btn]').click({ force: true })
    cy.wait(500)
    cy.get('[data-test=createTimeline]').click({ force: true })
    cy.get('[data-test=inputTimelineName]').type('Alpha')
    cy.get('[data-test=create-submit-btn]').click({ force: true })
    cy.wait(500)
    cy.get('[data-test=Timeline-View]').click({ force: true })
    cy.get('[data-test=Timeline-View-Refresh]').click({ force: true })
    cy.contains('Alpha')
    cy.wait(500)
    cy.get('.v-item-group > :nth-child(1)').click({ force: true })
    cy.get('div.v-sheet > .v-sheet > .v-toolbar__content').contains('Alpha')
  })

  it('check menus', function () {
    cy.get('.v-item-group > :nth-child(1)').click({ force: true })
    cy.get('[data-test=Timeline-View]').click({ force: true })
    cy.wait(100)
    cy.get('[data-test=Timeline-View-Calendar]').click({ force: true })
    cy.wait(100)
    cy.get('[data-test=Timeline-View]').click({ force: true })
    cy.wait(100)
    cy.get('[data-test=Timeline-View-List]').click({ force: true })
    cy.wait(100)
    cy.get('[data-test=Timeline-Time]').click({ force: true })
    cy.wait(100)
    cy.get('[data-test=Timeline-Time-UTC]').click({ force: true })
    cy.wait(100)
    cy.get('[data-test=Timeline-Time]').click({ force: true })
    cy.wait(100)
    cy.get('[data-test=Timeline-Time-Local]').click({ force: true })
    cy.wait(1000)
  })

  it('check calendar', function () {
    cy.get('.v-item-group > :nth-child(1)').click({ force: true })
    cy.get('[data-test=Timeline-View]').click({ force: true })
    cy.wait(100)
    cy.get('[data-test=Timeline-View-Calendar]').click({ force: true })
    cy.get('.col-9').contains('Alpha')
    cy.get('.vue-portal-target > .v-toolbar__content > :nth-child(1)').click({
      force: true,
    })
    cy.get('[data-test=changeType]').contains('4 Days').click({ force: true })
    cy.get('[data-test=typeDay]').click({ force: true })
    cy.get('[data-test=changeType]').contains('Day').click({ force: true })
    cy.get('[data-test=type4day]').click({ force: true })
    cy.get('[data-test=searchDate]').click({ force: true })
    const dateTime = add(new Date(), { days: 14 })
    cy.get('.v-text-field__slot > [data-test=searchDate]').type(
      formatDate(dateTime),
      { force: true }
    )
    cy.get('.ml-2').click({ force: true })
    cy.wait(500)
    cy.get('[data-test=next]').click({ force: true })
    cy.get('[data-test=prev]').click({ force: true })
    cy.get('[data-test=today]').click({ force: true })
    cy.wait(1000)
  })

  it('click add activity to timeline and cancel', function () {
    cy.get('.v-item-group > :nth-child(1)').click({ force: true })
    cy.get('[data-test=createActivity]').click({ force: true })
    cy.get('[data-test=activityKind]').contains('CMD').click({ force: true })
    cy.get('[data-test=reserve]').click({ force: true })
    cy.get('[data-test=activityKind]')
      .contains('RESERVE')
      .click({ force: true })
    cy.get('[data-test=script]').click({ force: true })
    cy.get('[data-test=activityKind]').contains('SCRIPT')
    const startDateTime = add(new Date(), { minutes: 10 })
    const stopDateTime = add(new Date(), { minutes: 20 })
    cy.get('[data-test=startDate]').type(formatDate(startDateTime))
    cy.get('[data-test=startTime]').type(formatTime(startDateTime))
    cy.get('[data-test=stopDate]').type(formatDate(stopDateTime))
    cy.get('[data-test=stopTime]').type(formatTime(stopDateTime))
    cy.get(
      ':nth-child(2) > .v-input--selection-controls__input > .v-input--selection-controls__ripple'
    ).click({ force: true })
    cy.get(
      'tbody > :nth-child(1) > :nth-child(1) > .v-data-table__checkbox > .v-input--selection-controls__input > .v-input--selection-controls__ripple'
    ).click({ force: true })
    cy.get(':nth-child(6) > .primary').click({ force: true }) // cancel
    cy.get('.v-data-footer__pagination').contains('–')
    cy.wait(1000)
  })

  it('click add activity to timeline and success', function () {
    cy.get('.v-item-group > :nth-child(1)').click({ force: true })
    cy.get('[data-test=createActivity]').click({ force: true })
    cy.get('[data-test=activityKind]').contains('CMD')
    const startDateTime = add(new Date(), { minutes: 10 })
    const stopDateTime = add(new Date(), { minutes: 20 })
    cy.get('[data-test=startDate]').type(formatDate(startDateTime))
    cy.get('[data-test=startTime]').type(formatTime(startDateTime))
    cy.get('[data-test=stopDate]').type(formatDate(stopDateTime))
    cy.get('[data-test=stopTime]').type(formatTime(stopDateTime))
    cy.get('[data-test=cmd]').type('Update this later')
    cy.get('[data-test=create-submit-btn]').click({ force: true })
    cy.wait(1000)
    cy.contains('cmd')
    cy.get('.v-data-footer__pagination').contains('1')
  })

  it('view activity from timeline', function () {
    cy.get('.v-item-group > :nth-child(1)').click({ force: true })
    cy.get('[data-test=activityActions]').click({ force: true })
    cy.get('[data-test=viewActivity]').click({ force: true })
    cy.get('.pa-3').contains('Timeline: Alpha')
    cy.get('#footer > img').click({ force: true })
    cy.get(':nth-child(8) > .v-icon').click({ force: true })
    cy.get('.v-data-table__expanded__content > td').contains('created')
    cy.get(':nth-child(8) > .v-icon').click({ force: true })
  })

  it('cancel update activity from timeline', function () {
    cy.get('.v-item-group > :nth-child(1)').click({ force: true })
    cy.get('[data-test=activityActions]').click({ force: true })
    cy.get('[data-test=updateActivity]').click({ force: true })
    cy.get('.pa-3').contains('Update activity: Alpha/')
    cy.get('[data-test=update-cancel-btn]').click({ force: true })
    cy.wait(500)
    cy.get('[data-test=updateActivity]').click({ force: true })
    cy.get('.pa-3').contains('Update activity: Alpha/')
    const startDateTime = add(new Date(), { minutes: 20 })
    const stopDateTime = add(new Date(), { minutes: 30 })
    cy.get('[data-test=startDate]').type(formatDate(startDateTime))
    cy.get('[data-test=startTime]').type(formatTime(startDateTime))
    cy.get('[data-test=stopDate]').type(formatDate(stopDateTime))
    cy.get('[data-test=stopTime]').type(formatTime(stopDateTime))
    cy.get('[data-test=cmd]').clear()
    cy.get('[data-test=cmd]').type('Update again in calendar view')
    cy.get('[data-test=update-submit-btn]').click({ force: true })
    cy.wait(1000)
  })

  it('view activity on calendar view', function () {
    cy.get('.v-item-group > :nth-child(1)').click({ force: true })
    cy.get('[data-test=Timeline-View]').click({ force: true })
    cy.wait(100)
    cy.get('[data-test=Timeline-View-Calendar]').click({ force: true })
    cy.wait(500)
    cy.get('.v-event-timed').click({ force: true })
    cy.get('.menuable__content__active > .v-card > .v-card__text').contains(
      'Update'
    )
    cy.get('[data-test=viewActivityIcon]').click({ force: true })
    cy.get('.pa-3').contains('Timeline: Alpha')
    cy.get('#footer > img').click({ force: true })
    cy.wait(500)
  })

  it('update activity on calendar view', function () {
    cy.get('.v-item-group > :nth-child(1)').click({ force: true })
    cy.get('[data-test=Timeline-View]').click({ force: true })
    cy.wait(100)
    cy.get('[data-test=Timeline-View-Calendar]').click({ force: true })
    cy.wait(500)
    cy.get('.v-event-timed').click({ force: true })
    cy.get('.menuable__content__active > .v-card > .v-card__text').contains(
      'Update'
    )
    cy.get('[data-test=updateActivityIcon]').click({ force: true })
    cy.get('.pa-3').contains('Update activity: Alpha/')
    const startDateTime = add(new Date(), { minutes: 20 })
    const stopDateTime = add(new Date(), { minutes: 30 })
    cy.get('[data-test=startDate]').type(formatDate(startDateTime))
    cy.get('[data-test=startTime]').type(formatTime(startDateTime))
    cy.get('[data-test=stopDate]').type(formatDate(stopDateTime))
    cy.get('[data-test=stopTime]').type(formatTime(stopDateTime))
    cy.get('[data-test=cmd]').clear()
    cy.get('[data-test=cmd]').type(
      'INST COLLECT with TYPE 0, DURATION 1, OPCODE 171, TEMP 0'
    )
    cy.get('[data-test=update-submit-btn]').click({ force: true })
    cy.wait(500)
  })

  it('remove activity from timeline', function () {
    cy.get('.v-item-group > :nth-child(1)').click({ force: true })
    cy.get(
      ':nth-child(1) > :nth-child(7) > .row > .mt-1 > .v-btn__content > .v-icon'
    ).click({ force: true })
    cy.get('[data-test=deleteActivity]').click({ force: true })
    cy.get('.dg-content').contains('from timeline: Alpha')
    cy.get('.dg-btn--cancel').click({ force: true })
    cy.wait(500)
    cy.get(
      ':nth-child(1) > :nth-child(7) > .row > .mt-1 > .v-btn__content > .v-icon'
    ).click({ force: true })
    cy.get('[data-test=deleteActivity]').click({ force: true })
    cy.get('.dg-btn--ok').click({ force: true })
    cy.wait(500)
  })

  it('color timeline', function () {
    cy.get('.v-list-item__content > .v-btn > .v-btn__content > .v-icon').click({
      force: true,
    })
    cy.contains('Color').click({ force: true })
    cy.wait(500)
    cy.get('.pa-3 > .v-toolbar > .v-toolbar__content').contains(
      'Timeline: Alpha'
    )
    cy.get('.pa-4').contains('#')
    cy.get(':nth-child(3) > .primary').click({ force: true })
    cy.get('.v-list-item__content > .v-btn > .v-btn__content > .v-icon').click({
      force: true,
    })
    cy.contains('Color').click({ force: true })
    cy.wait(500)
    cy.get(':nth-child(3) > .success').click({ force: true })
    cy.wait(500)
  })

  it('delete timeline', function () {
    cy.get('.v-list-item__content > .v-btn > .v-btn__content > .v-icon').click({
      force: true,
    })
    cy.contains('Delete').click({ force: true })
    cy.get('.dg-content').contains('remove: Alpha')
    cy.get('.dg-btn--cancel').click({ force: true })
    cy.get('.v-list-item__content > .v-btn > .v-btn__content > .v-icon').click({
      force: true,
    })
    cy.contains('Delete').click({ force: true })
    cy.get('.dg-btn--ok').click({ force: true })
    cy.wait(500)
  })

  it('create two new timelines', function () {
    cy.get('[data-test=createTimeline]').click({ force: true })
    cy.get('[data-test=inputTimelineName]').type('Beta')
    cy.get('[data-test=create-submit-btn]').click({ force: true })
    cy.contains('Beta')
    cy.get('[data-test=createTimeline]').click({ force: true })
    cy.get('[data-test=inputTimelineName]').type('Gamma')
    cy.get('[data-test=create-submit-btn]').click({ force: true })
    cy.contains('Gamma')
  })

  it('click add first activity to Beta timeline and success', function () {
    cy.get('.v-list-item > .row > :nth-child(1)').first().click({ force: true })
    cy.get('.v-data-footer__pagination').contains('–')
    cy.get('[data-test=createActivity]').click({ force: true })
    const startDateTime = add(new Date(), { minutes: 10 })
    const stopDateTime = add(new Date(), { minutes: 20 })
    cy.get('[data-test=startDate]').type(formatDate(startDateTime))
    cy.get('[data-test=startTime]').type(formatTime(startDateTime))
    cy.get('[data-test=stopDate]').type(formatDate(stopDateTime))
    cy.get('[data-test=stopTime]').type(formatTime(stopDateTime))
    cy.get('[data-test=cmd]').type('Test')
    cy.get(':nth-child(6) > .success').click({ force: true })
    cy.get('[data-test=createActivity]').click({ force: true })
    cy.wait(500)
    cy.get('.v-data-footer__pagination').contains('of 1')
  })

  it('click add second activity to Beta timeline and success', function () {
    cy.get('.v-list-item > .row > :nth-child(1)').first().click({ force: true })
    cy.get('.v-data-footer__pagination').contains('1')
    cy.get('[data-test=createActivity]').click({ force: true })
    const startDateTime = add(new Date(), { minutes: 30 })
    const stopDateTime = add(new Date(), { minutes: 40 })
    cy.get('[data-test=startDate]').type(formatDate(startDateTime))
    cy.get('[data-test=startTime]').type(formatTime(startDateTime))
    cy.get('[data-test=stopDate]').type(formatDate(stopDateTime))
    cy.get('[data-test=stopTime]').type(formatTime(stopDateTime))
    cy.get('[data-test=cmd]').type('Test')
    cy.get(':nth-child(6) > .success').click({ force: true })
    cy.wait(500)
    cy.get('.v-data-footer__pagination').contains('of 2')
  })

  it('click add activity to Gamma timeline and success', function () {
    cy.get('.v-list-item > .row > :nth-child(1)').last().click({ force: true })
    cy.get('.v-data-footer__pagination').contains('–')
    cy.get('[data-test=createActivity]').click({ force: true })
    cy.get('.pa-3 > .v-toolbar > .v-toolbar__content > .v-btn').contains('CMD')
    const startDateTime = add(new Date(), { minutes: 10 })
    const stopDateTime = add(new Date(), { minutes: 20 })
    cy.get('[data-test=startDate]').type(formatDate(startDateTime))
    cy.get('[data-test=startTime]').type(formatTime(startDateTime))
    cy.get('[data-test=stopDate]').type(formatDate(stopDateTime))
    cy.get('[data-test=stopTime]').type(formatTime(stopDateTime))
    cy.get('[data-test=cmd]').type('Test')
    cy.get(':nth-child(6) > .success').click({ force: true })
    cy.wait(1000)
    cy.contains('cmd')
    cy.get('.v-data-footer__pagination').contains('of 1')
  })

  it('view multiple from Beta and Gamma timeline', function () {
    cy.get('.mdi-check').click({ force: true })
    cy.get('.v-list-item > .row > :nth-child(1)').each(($el, index, $list) => {
      cy.wrap($el).click({ force: true })
    })
    cy.get(
      'div.v-sheet > .v-sheet > .v-toolbar__content > .v-toolbar__title'
    ).contains('Beta, Gamma')
    cy.get('.v-data-footer__pagination').contains('of 3')
  })

  it('remove multiple from Beta and Gamma timeline', function () {
    cy.get('.mdi-check').click({ force: true })
    cy.get('.v-list-item > .row > :nth-child(1)').each(($el, index, $list) => {
      cy.wrap($el).click({ force: true })
    })
    cy.get(
      'div.v-sheet > .v-sheet > .v-toolbar__content > .v-toolbar__title'
    ).contains('Beta, Gamma')
    cy.get('.v-data-footer__pagination').contains('of 3')
    cy.get(
      '.v-data-table-header > tr > :nth-child(1) > .v-data-table__checkbox > .v-input--selection-controls__input > .v-input--selection-controls__ripple'
    ).click({ force: true })
    cy.get('.v-data-footer__pagination').contains('of 3')
    cy.get('.ma-2 > .v-btn__content > .v-icon').click({ force: true })
    cy.get('.dg-btn--cancel').click({ force: true })
    cy.get('.ma-2 > .v-btn__content > .v-icon').click({ force: true })
    cy.wait(1000)
    cy.get('#dg-input-elem').type('delete')
    cy.get('.dg-btn--ok').click({ force: true })
    cy.wait(1000)
    cy.get('.v-data-footer__pagination').contains('–')
  })

  it('removes timeline', function () {
    cy.get('.mdi-check').click({ force: true })
    cy.get('.mdi-close').click({ force: true })
    cy.get('.mdi-check').click({ force: true })
    cy.get('.v-list-item > .row > :nth-child(1)').each(($el, index, $list) => {
      cy.wrap($el).click({ force: true })
    })
    cy.get('[data-test=deleteSelectedTimelines]').click({ force: true })
  })
})
