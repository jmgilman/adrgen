import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('docs/features/1. init_the_directory_and_config.feature');

defineFeature(feature, test => {
    test('initialize the configuration and directories', ({ given, when, then }) => {
        given('the user is in an initial directory', function() {
            pending();
        });
        when(/^the user specify the (.*) directory$/, function() {
            pending();
        });
        when(/^the init command is executed$/, function() {
            pending();
        });
        then(/^the specified directory is created$/, function() {
            pending();
        });
        then(/^the template file is created in the (.*) location$/, function() {
            pending();
        });
        then(/^the (.*) config file is created$/, function() {
            pending();
        });
    });
});