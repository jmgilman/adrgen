package cmd

import (
	"fmt"
	"github.com/asiermarques/adrgen/application"
	"strings"
	"time"

	"github.com/asiermarques/adrgen/domain"
	"github.com/asiermarques/adrgen/infrastructure"
	"github.com/spf13/cobra"
)

// NewCreateCmd creates the 'create' CLI Command related to the ADR file creation
//
func NewCreateCmd() *cobra.Command {
	command := &cobra.Command{
		Use:   "create [the ADR title]",
		Short: "Create a new ADR File in the current directory",
		Long:  `Create a new ADR File in the current directory, you can add meta parameters for decisions tracing`,
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {

			config, err := GetConfig("")
			if err != nil {
				fmt.Printf(
					"config file not found, working in the %s directory\n",
					config.TargetDirectory,
				)
			} else {
				fmt.Printf("config file found, working in the %s directory\n", config.TargetDirectory)
			}

			meta, metaError := cmd.LocalFlags().GetStringSlice("meta")
			if metaError != nil {
				fmt.Printf("an error occurred processing the meta parameter %s\n", metaError)
				return
			}
			for i, value := range meta {
				meta[i] = strings.TrimSpace(value)
			}
			config.MetaParams = append(config.MetaParams, meta...)

			currentTime := time.Now()
			date := currentTime.Format("02-01-2006")

			filename, creationError := application.CreateADRFile(
				date,
				args[0],
				meta,
				config,
				infrastructure.CreateADRRepository(config.TargetDirectory),
				infrastructure.CreateFileADRWriter(config.TargetDirectory),
				domain.CreateTemplateService(infrastructure.CreateCustomTemplateContentFileReader(config)),
			)
			if creationError != nil {
				fmt.Println(creationError)
				return
			}
			fmt.Println(fmt.Sprintf("%s created\n", filename))
		},
	}
	command.Flags().StringSliceVarP(&MetaFlag, "meta", "m", []string{}, "")
	command.Example = "adrgen create \"Using ADR to record and maintain decisions records\""
	return command
}

func init() {
	rootCmd.AddCommand(NewCreateCmd())
}
