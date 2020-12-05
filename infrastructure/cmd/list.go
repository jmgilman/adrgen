package cmd

import (
	"fmt"

	"github.com/asiermarques/adrgen/domain"
	"github.com/asiermarques/adrgen/infrastructure"
	"github.com/rodaine/table"
	"github.com/spf13/cobra"
)

// NewListCmd creates the 'list' CLI Command that shows all the ADRs
//
func NewListCmd() *cobra.Command {
	command := &cobra.Command{
		Use:   "list",
		Short: "List the ADR files",
		Long:  `List the ADR files`,
		Args:  cobra.ExactArgs(0),
		Run: func(cmd *cobra.Command, args []string) {
			config, err := GetConfig()
			if err != nil {
				if config.TargetDirectory != "" {
					fmt.Printf("error creating file: %s", err)
				}

				fmt.Printf(
					"config file not found, working in the %s directory\n",
					config.TargetDirectory,
				)
			} else {
				fmt.Printf("config file found, working in the %s directory\n", config.TargetDirectory)
			}

			adrs, err := infrastructure.CreateADRDirectoryRepository(
				config.TargetDirectory,
			).FindAll()
			if err != nil {
				fmt.Printf("error listing the adr files: %s", err)
				return
			}

			table := createTable()
			for _, adr := range adrs {
				addADRRow(adr, table)
			}

			fmt.Println("")
			table.Print()
			fmt.Println("")
		},
	}
	command.Example = "adrgen list"
	return command
}

func addADRRow(adr domain.ADR, table table.Table) {
	table.AddRow(adr.Title(), adr.Status(), adr.Date(), adr.ID(), adr.Filename().Value())
}

func createTable() table.Table {
	tbl := table.New("Title", "Status", "Date", "ID", "Filename")
	return tbl
}

func init() {
	rootCmd.AddCommand(NewListCmd())
}