Feature: create an ADR File

  In order to have registered context about architecture decisions
  As an ADR writer
  I want to execute a command that register the decision in an ADR file

  Background:

    ADRGen allows creating ADR Files with the command

        adrgen create "My ADR file"

    This creates an markdown file taking setting a new id automatically, by calculating the last id
    from all the ADR files in the specified directory in the configuration or if there is no configuration
    taking the current directory instead.


  Scenario Outline: create adr files

    Given there is a config file created with this configuration
      | default_status | directory       | template_file              | id_digit_number |
      | proposed       | docs/tests/adr  | docs/tests/adr/template.md | 4               |

    When the user specify the <title> title
      And the command is executed
    Then a <filename> is created
      And the adr has an id <id>
      And the adr has a <status> status
      And the adr file content has the <title_in_file> title

    Examples:
    | title             | filename         | id  | status    | title_in_file |
    | New adr           | 0001-new-adr.md  | 1   | proposed  | 1. New adr    |
    | New adr           | 0002-new-adr.md  | 2   | proposed  | 2. New adr    |
    | New adr           | 0003-new-adr.md  | 3   | proposed  | 3. New adr    |
    | New adr           | 0004-new-adr.md  | 4   | proposed  | 4. New adr    |
